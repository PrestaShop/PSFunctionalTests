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
				.waitFor(this.selector.access_loginFO, 5000)
				.click2(this.selector.access_loginFO)
				.waitFor(this.selector.create_account, 5000)
				.setValue2(this.selector.create_account, new_customer_email)
				.click2(this.selector.create_account_button)
				.waitFor(this.selector.create_account_firstname,5000)
				.setValue2(this.selector.create_account_firstname, 'my firstname')
				.setValue2(this.selector.create_account_lastname, 'my lastname')
				.setValue2(this.selector.create_account_email, new_customer_email)
				.setValue2(this.selector.create_account_password, '123456789')
				.pause(2000)
				.click2(this.selector.create_account_info_validate)
				.waitFor('.alert.alert-success', 5000)
				.call(done);
		});
		
		it('log_out_and_login_again', function(done){
			this.client
				.signoutFO()
				.url('http://' + URL)
				.waitFor(this.selector.access_loginFO, 5000)
				.click(this.selector.access_loginFO)
				.waitFor(this.selector.loginFO, 5000)
				.setValue2(this.selector.loginFO, new_customer_email)
				.setValue2(this.selector.passwordFO, '123456789')
				.click(this.selector.login_btnFO)
				.waitFor(this.selector.logo_home_pageFO, 5000)
				.call(done);
		});
		
		it('logout_FO', function(done){
			this.client
				.signoutFO()
				.call(done);
		});
		
});