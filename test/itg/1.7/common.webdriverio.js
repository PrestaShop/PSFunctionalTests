'use strict';
var client;
var webdriverio = require('webdriverio');
var globals = require('./globals.webdriverio');

var options = {
    logLevel: 'silent',
    waitForTimeout: 30000,
    desiredCapabilities: {
        browserName: 'chrome',
    },
    port: 4444
};
if (typeof global.selenium_url !== 'undefined') {
    options.host = global.selenium_url;
}

var options2 = {
    logLevel: 'silent',
    waitForTimeout: 30000,
    desiredCapabilities: {
        browserName: 'chrome',
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
        username: process.env.SAUCE_USERNAME,
        access_key: process.env.SAUCE_ACCESS_KEY,
        screenResolution: "1680x1050",
        platform: "Windows 7",
    },
    port: 4445
};

function initCommands(client) {

    client.addCommand('localhost', function (cb) {
        this.selector = globals.selector;
        client
            .url('http://' + URL + 'install-dev')
            .call(cb);
    });

    client.addCommand('signinBO', function (cb) {
        this.selector = globals.selector;
        client
            .url('http://' + URL + '/admin-dev')
            .waitForExist(this.selector.login, 90000)
            .setValue(this.selector.login, 'demo@prestashop.com')
            .setValue(this.selector.password, 'prestashop_demo')
            .click(this.selector.login_btn)
            .waitForExist(this.selector.menu, 90000)
            .call(cb);
    });

    client.addCommand('signinFO', function (cb) {
        this.selector = globals.selector;
        client
            .url('http://' + URL)
            .waitForExist(this.selector.access_loginFO, 90000)
            .click(this.selector.access_loginFO)
            .waitForExist(this.selector.loginFO, 90000)
            .setValue(this.selector.loginFO, 'pub@prestashop.com')
            .setValue(this.selector.passwordFO, '123456789')
            .click(this.selector.login_btnFO)
            .call(cb);
    });

    client.addCommand('signoutBO', function (cb) {
        this.selector = globals.selector;
        client
            .deleteCookie()
            .call(cb);
    });

    client.addCommand('signoutBO2', function (cb) {
        this.selector = globals.selector;
        client
            .deleteCookie()
            .call(cb);
    });

    client.addCommand('signoutFO', function (cb) {
        this.selector = globals.selector;
        client
        /*.waitForExist(this.selector.logoutFO, 90000)
         .click(this.selector.logoutFO)
         .waitForExist(this.selector.access_loginFO, 90000)*/
            .deleteCookie()
            .call(cb);
    });


}
module.exports = {
    getClient: function () {
        if (client) {
            return client;
        } else {
            if (typeof saucelabs !== 'undefined' && saucelabs != "None") {
                client = webdriverio
                    .remote(options2)
                    .init()
                .windowHandleSize({width: 1280, height: 1024});
            } else {
                client = webdriverio
                    .remote(options)
                    .init()
                .windowHandleSize({width: 1280, height: 1024});
            }
            initCommands(client);

            return client;
        }
    },
    after: function (done) {
        done();
    },
    take_screenshot: function (done) {
        client.saveScreenshot(__dirname + '/screenshots/' + client.desiredCapabilities.browserName + '_exception' + '_' + global.date_time + '_' + global.fctname + '.png');
    },
    initMocha: function () {
        this.timeout(900000000);
        this.slow(45000);
    },
    browser: function () {
        return options.desiredCapabilities.browserName
    }
};
