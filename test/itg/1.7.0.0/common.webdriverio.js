'use strict';
var client;
var webdriverio = require('webdriverio');
var globals = require('./globals.webdriverio');

var options = {
    logLevel: 'silent',
    waitForTimeout: 30000,
    desiredCapabilities: {
        browserName: 'chrome'
	},
	port: 4444
};

function initCommands(client) {
    client.addCommand('signinBO', function(cb) {
		this.selector = globals.selector;
		client
			.url('http://' + URL + '/admin-dev')
			.waitForExist(this.selector.login, 60000)
            .setValue(this.selector.login, 'demo@prestashop.com')
            .setValue(this.selector.password, 'prestashop_demo')
            .click(this.selector.login_btn)
			.call(cb);
    });
	
	client.addCommand('signinFO', function(cb) {
		this.selector = globals.selector;
        client
			.url('http://' + URL)
			.waitForExist(this.selector.access_loginFO, 60000)
			.click(this.selector.access_loginFO)
			.waitForExist(this.selector.loginFO, 60000)
            .setValue(this.selector.loginFO, 'pub@prestashop.com')
            .setValue(this.selector.passwordFO, '123456789')
            .click(this.selector.login_btnFO)
            .call(cb);
    });

	client.addCommand('signoutBO', function(cb) {
		this.selector = globals.selector;
       	client
			.deleteCookie()
			.call(cb);
	});
	
	client.addCommand('signoutBO2', function(cb) {
		this.selector = globals.selector;
		client
			.deleteCookie()
			.call(cb);
	});
	
	client.addCommand('signoutFO', function(cb) {
		this.selector = globals.selector;
        client
			/*.waitForExist(this.selector.logoutFO, 60000)
			.click(this.selector.logoutFO)
			.waitForExist(this.selector.access_loginFO, 60000)*/
			.deleteCookie()
			.call(cb);
	});
	
		
}
module.exports = {
    getClient: function () {
        if (client) {
            return client;
        } else {
            client = webdriverio
                .remote(options)
                .init()
				.windowHandleMaximize()			

            initCommands(client);

            return client;
        }
    },
    after: function (done) {
            done();
    },
    initMocha: function () {
        this.timeout(100000);
        this.slow(30000);
    }
};