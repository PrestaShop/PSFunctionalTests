'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');

describe('create_account', function(){
	common.initMocha.call(this);
	
	before(function(done){
		this.selector = globals.selector;
		this.client.call(done);
	});

	after(common.after);
		
		it('create_customer_account_FO', function(done){
			this.client
				.url('http://' + URL)
				.waitForExist(this.selector.access_loginFO, 30000)
				.click(this.selector.access_loginFO)
				.waitForExist(this.selector.create_account, 30000)
				.setValue(this.selector.create_account, new_customer_email)
				.click(this.selector.create_account_button)
				.waitForExist(this.selector.create_account_firstname,30000)
				.setValue(this.selector.create_account_firstname, 'my firstname')
				.setValue(this.selector.create_account_lastname, 'my lastname')
				.setValue(this.selector.create_account_email, new_customer_email)
				.setValue(this.selector.create_account_password, '123456789')
				.pause(2000)
				.click(this.selector.create_account_info_validate)
				.waitForExist('.alert.alert-success', 30000)
				.call(done);
		});
		
		it('log_out_and_login_again', function(done){
			this.client
				.signoutFO()
				.url('http://' + URL)
				.waitForExist(this.selector.access_loginFO, 30000)
				.click(this.selector.access_loginFO)
				.waitForExist(this.selector.loginFO, 30000)
				.setValue(this.selector.loginFO, new_customer_email)
				.setValue(this.selector.passwordFO, '123456789')
				.click(this.selector.login_btnFO)
				.waitForExist(this.selector.logo_home_pageFO, 30000)
				.call(done);
		});
		
		it('logout_FO', function(done){
			this.client
				.signoutFO()
				.call(done);
		});
		
});