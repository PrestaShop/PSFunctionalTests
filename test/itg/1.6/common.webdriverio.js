'use strict';
var client;
var webdriverio = require('webdriverio');
var globals = require('./globals.webdriverio');

var options = {
    logLevel: 'silent',
    waitForTimeout: 60000,
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
    waitForTimeout: 60000,
    desiredCapabilities: {
        browserName: 'chrome',
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
        username: process.env.SAUCE_USERNAME,
        access_key: process.env.SAUCE_ACCESS_KEY,
        screenResolution: "1680x1050",
        platform: "Windows 7",
    },
    port: 4444
};

function initCommands(client) {

    client.addCommand('signinBO', function (cb) {
        this.selector = globals.selector;
        client
            .url('http://' + URL + '/admin-dev')
            .waitForExist(this.selector.BO.AccessPage.login_input, 120000)
            .setValue(this.selector.BO.AccessPage.login_input, 'demo@prestashop.com')
            .waitForExist(this.selector.BO.AccessPage.password_input, 120000)
            .setValue(this.selector.BO.AccessPage.password_input, 'prestashop_demo')
            .waitForExist(this.selector.BO.AccessPage.login_button, 120000)
            .click(this.selector.BO.AccessPage.login_button)
            .call(cb);
    });

    client.addCommand('signinFO', function (done) {
        this.selector = globals.selector;
        client
            .url('http://' + URL)
            .waitForExist(this.selector.FO.AccessPage.sign_in_button, 90000)
            .click(this.selector.FO.AccessPage.sign_in_button)
            .waitForExist(this.selector.FO.AccessPage.email_input, 90000)
            .setValue(this.selector.FO.AccessPage.email_input, 'pub@prestashop.com')
            .setValue(this.selector.FO.AccessPage.password_input, '123456789')
            .click(this.selector.FO.AccessPage.login_button)
            .call(done);
    });

    client.addCommand('signoutBO', function (cb) {
        client
            .deleteCookie()
            .call(cb);
    });


    client.addCommand('signoutFO', function (cb) {
        this.selector = globals.selector;
        client
            .waitForExist(this.selector.FO.AccessPage.sign_out_button, 90000)
            .click(this.selector.FO.AccessPage.sign_out_button)
            .waitForExist(this.selector.FO.AccessPage.sign_in_button, 90000)
            .call(cb);
    });

    client.addCommand('click2', function (cb, done) {
        client.click(cb, function (err) {
            if (err) {
                var date_time = new Date().getTime();
                client.saveScreenshot('./screenshots/' + date_time + '.png', function (err, result) {
                    if (err) {
                    } else {
                        console.log('Error, screenshot as taken with name : ' + date_time + '.png');
                    }
                });
            }
        });
        client.call(done);
    });

    client.addCommand('setValue2', function (element, value, done) {
        client.setValue(element, value, function (err) {
            if (err) {
                var date_time = new Date().getTime();
                client.saveScreenshot('./screenshots/' + date_time + '.png', function (err, result) {
                    if (err) {
                    } else {
                        console.log('Error, screenshot as taken with name : ' + date_time + '.png');
                    }
                });
            }
        });
        client.call(done);
    });

    client.addCommand('takeScreenshot', function (n) {
        var date_time = new Date().getTime();
        client.saveScreenshot(__dirname + '/screenshots/' + date_time + '_' + n + '.png');
    });

}
module.exports = {
    getClient: function () {
        if (client) {
            return client;
        } else {
            if (saucelabs != "None") {
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
        this.timeout(100000);
        this.slow(50000);
    },
    browser: function () {
        return options.desiredCapabilities.browserName
    }
};
