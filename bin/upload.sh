#!/bin/sh

FIXED_BRANCH=$(echo $TRAVIS_BRANCH | sed 's/\//-/g')
echo $FIXED_BRANCH
echo $TRAVIS_REPO_SLUG
echo $TRAVIS_COMMIT
ARCHIVE=$TRAVIS_REPO_SLUG-$FIXED_BRANCH-$(date +%Y-%m-%d_%H_%M_%S)-$TRAVIS_COMMIT.tar.bz2
echo "Creating archive $ARCHIVE"
tar cfj $ARCHIVE dist
FILESIZE=$(stat -c%s "$ARCHIVE")
echo "Finished archive (size $FILESIZE), starting Google Drive upload"
./bin/gdrive-linux-x64 upload --refresh-token $GDRIVE_REFRESH_TOKEN --parent $GDRIVE_DIR "$ARCHIVE"
echo "Finished Google Drive upload"