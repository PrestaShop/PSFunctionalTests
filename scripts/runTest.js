"use strict";
const shell = require('shelljs');
const args = require('minimist')(process.argv.slice(2));

const runScript = function (version, url, grep, bail) {
  let commandOptions = [];
  let printOptions = [];

  if (grep.length > 0) {
    commandOptions.push(`-g ${grep}`);
    printOptions.push(`grep "${grep}"`)
  }

  if (bail) {
    commandOptions.push(`-b`);
    printOptions.push(`stop-on-errors`)
  }

  let command = `node_modules/mocha/bin/mocha test/itg/${version}/index.webdriverio.js --URL=${url}${
    (commandOptions.length > 0) ? (' ' + commandOptions.join(' ')) : ''
  }`;

  console.log(`Running ${version} tests${
    (printOptions.length > 0) ? (" with:\n - " + printOptions.join('\n - ')) : ''
  }\n - on http://${url}\n`);

  console.log(command);

  if (shell.exec(command).code !== 0) {
    console.log("Tests failed!");
    return 1;
  }

  console.log("\nAll done!");
  return 0;
};

// default arguments
const url = args.url || 'prestashop';
const version = args.version || '1.7';
const grep = String(args.g || args.grep || '');
const bail = String(args.hasOwnProperty('b') || args.hasOwnProperty('bail') || '');

process.exitCode = runScript(version, url, grep, bail);
