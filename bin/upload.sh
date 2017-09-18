#!/bin/sh

FIXED_BRANCH=$(echo $TRAVIS_BRANCH | sed 's/\//-/g')
ARCHIVE=ScreenShot-$FIXED_BRANCH-$(date +%Y-%m-%d_%H_%M_%S)-$TRAVIS_COMMIT.tar.bz2
DIR="test/itg/$PS_VERSION/screenshots"

# look for empty dir
if [ "$(ls -A $DIR)" ]; then
    echo "Creating archive $ARCHIVE"
    tar -cjf $ARCHIVE -C $DIR .
    FILESIZE=$(stat -c%s "$ARCHIVE")
    echo "Finished archive (size $FILESIZE), starting Google Drive upload"
    ./bin/gdrive-linux-x64 upload --refresh-token $GDRIVE_REFRESH_TOKEN --parent $GDRIVE_DIR "$ARCHIVE"
    echo "Finished Google Drive upload"
else
    echo "$DIR is empty"
fi

# uploading mochareporter to Gdrive
ARCHIVE_REPORTER=TestReport-$FIXED_BRANCH-$(date +%Y-%m-%d_%H_%M_%S)-$TRAVIS_COMMIT.zip
echo "Creating archive of test report $ARCHIVE_REPORTER"
cd test/itg/$PS_VERSION/ && \
zip -r $ARCHIVE_REPORTER mochawesome-report/*
cd ../../..
./bin/gdrive-linux-x64 upload --refresh-token $GDRIVE_REFRESH_TOKEN --parent $GDRIVE_DIR "test/itg/$PS_VERSION/$ARCHIVE_REPORTER"
echo "Finished uploading test report"
