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
	host: 'localhost',
	port: 4444
};

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

    client.addCommand('signinBO', function(cb) {
		this.selector = globals.selector;
		client
			.url('http://' + URL + '/admin-dev')
			.waitForExist(this.selector.login, 120000)
            .setValue(this.selector.login, 'demo@prestashop.com')
            .waitForExist(this.selector.password, 120000)
            .setValue(this.selector.password, 'prestashop_demo')
            .waitForExist(this.selector.login_btn, 120000)
            .click(this.selector.login_btn)
			.call(cb);
    });

	client.addCommand('signinFO', function(done) {
		this.selector = globals.selector;
        client
			.url('http://' + URL)
			.waitForExist(this.selector.access_loginFO, 90000)
			.click(this.selector.access_loginFO)
			.waitForExist(this.selector.loginFO, 90000)
            .setValue(this.selector.loginFO, 'pub@prestashop.com')
            .setValue(this.selector.passwordFO, '123456789')
            .click(this.selector.login_btnFO)
            .call(done);
    });

	client.addCommand('signoutBO', function(cb) {
		client
			.deleteCookie()
		    .call(cb);
	});


	client.addCommand('signoutFO', function(cb) {
		this.selector = globals.selector;
        client
			.waitForExist(this.selector.logoutFO, 90000)
			.click(this.selector.logoutFO)
			.waitForExist(this.selector.access_loginFO, 90000)
			.call(cb);
	});

	client.addCommand('click2', function(cb, done){
		client.click(cb, function(err){
			if (err){
				var date_time = new Date().getTime();
				client.saveScreenshot('./screenshots/' + date_time + '.png', function (err, result){
					if (err) {
					}else{
						console.log('Error, screenshot as taken with name : ' + date_time + '.png');
					}
				});
			}
		});
		client.call(done);
	});

	client.addCommand('setValue2', function(element,value, done){
		client.setValue(element,value, function(err){
			if (err){
				var date_time = new Date().getTime();
				client.saveScreenshot('./screenshots/' + date_time + '.png', function (err, result){
					if (err) {
					}else{
						console.log('Error, screenshot as taken with name : ' + date_time + '.png');
					}
				});
			}
		});
		client.call(done);
	});

	client.addCommand('takeScreenshot', function(n){
	    var date_time = new Date().getTime();
	    client.saveScreenshot(__dirname + '/screenshots/' + date_time + '_'+n+'.png');
	});

}
module.exports = {
    getClient: function () {
        if (client) {
            return client;
        } else {
			if (saucelabs != "None"){
				client = webdriverio
					.remote(options2)
					.init()
					.windowHandleMaximize()
			}else{
            client = webdriverio
					.remote(options)
					.init()
					.windowHandleMaximize()
			}
            initCommands(client);

            return client;
        }
    },
    after: function (done) {
            done();
    },
    initMocha: function () {
        this.timeout(100000);
        this.slow(50000);
    }
};
