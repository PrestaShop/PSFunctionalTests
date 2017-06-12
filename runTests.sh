#!/usr/bin/env bash

PS_VERSION="${PS_VERSION:-1.7}"
URL="${URL:-prestashop}"
MODULE="${MODULE:-}"
SAUCELABS="${SAUCELABS:-}"
SCRIPT="${SCRIPT:-index.webdriverio.js}"

COMMAND="/tmp/node_modules/mocha/bin/mocha /tmp/test/itg/$PS_VERSION/$SCRIPT --URL=$URL"

if [ -n "$MODULE" ]; then
    COMMAND="$COMMAND --MODULE=$MODULE"
fi

if [ -n "$SAUCELABS" ]; then
    COMMAND="$COMMAND --SAUCELABS"
fi
echo $COMMAND
$COMMAND