'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');

describe('The creation of an account in Front Office', function(){
	common.initMocha.call(this);
	
	before(function(done){
		this.selector = globals.selector;
		this.client.call(done);
	});
    process.on('uncaughtException', common.take_screenshot);
	process.on('ReferenceError', common.take_screenshot);
	after(common.after);

	describe('Create a customer account in FO', function(done){
		it('should acces to the Front Office', function(done){
		    global.fctname= this.test.title;
			this.client
				.url('http://' + URL)
				.waitForExist(this.selector.access_loginFO, 60000)
				.call(done)
		});

		it('should acces to the account creation interface', function(done){
		    global.fctname= this.test.title;
			this.client
				.click(this.selector.access_loginFO)
				.waitForExist(this.selector.create_account, 60000)
				.setValue(this.selector.create_account, new_customer_email)
				.click(this.selector.create_account_button)
				.waitForExist(this.selector.create_account_firstname,60000)
				.call(done);
		});

		it('should fill the form', function(done){
		    global.fctname= this.test.title;
			this.client
				.setValue(this.selector.create_account_firstname, 'my firstname')
				.setValue(this.selector.create_account_lastname, 'my lastname')
				.setValue(this.selector.create_account_email, new_customer_email)
				.setValue(this.selector.create_account_password, '123456789')
				.pause(2000)
				.call(done);
		});

		it('should validate the creation of the account', function(done){
		    global.fctname= this.test.title;
			this.client
				.click(this.selector.create_account_info_validate)
				.waitForExist('.alert.alert-success', 60000)
				.call(done);
		});
	});

	describe('Log out and Log in again', function(done){
		it('should log out', function(done){
		    global.fctname= this.test.title;
			this.client
				.waitForExist(this.selector.logoutFO, 90000)
                .click(this.selector.logoutFO)
                .waitForExist(this.selector.access_loginFO, 90000)
				.call(done);
		});

		it('should log in again', function(done){
		    global.fctname= this.test.title;
			this.client
				.click(this.selector.access_loginFO)
				.waitForExist(this.selector.loginFO, 60000)
				.setValue(this.selector.loginFO, new_customer_email)
				.setValue(this.selector.passwordFO, '123456789')
				.click(this.selector.login_btnFO)
				.waitForExist(this.selector.logo_home_pageFO, 60000)
				.call(done);
		});
	});

	describe('Log out in Front Office', function(done){
		it('should logout successfully in FO', function(done){
		    global.fctname= this.test.title;
			this.client
				.waitForExist(this.selector.logoutFO, 60000)
			    .click(this.selector.logoutFO)
			    .waitForExist(this.selector.access_loginFO, 60000)
				.call(done);
		});
	});

});