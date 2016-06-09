'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');


describe('buy_product', function(){
	common.initMocha.call(this);
	
	before(function(done){
		this.selector = globals.selector;
		this.client.call(done);
	});

	after(common.after);
		
		it('loggin_FO', function(done){
                     this.client
				//.signinFO()

			.url('http://' + URL)
			.waitForExist(this.selector.access_loginFO, 30000)
			.click(this.selector.access_loginFO)
			.waitForExist(this.selector.loginFO, 30000)
                        .setValue(this.selector.loginFO, 'pub@prestashop.com')
                        .setValue(this.selector.passwordFO, '123456789')
                        .click(this.selector.login_btnFO)
                        .call(done);
		});
		
		it('add_product_to_cart', function(done){
			this.client
                                .waitForExist(this.selector.logo_home_pageFO, 30000)
				.click(this.selector.logo_home_pageFO)
				.waitForExist(this.selector.first_product_home_page, 30000)
				.getText(this.selector.first_product_home_page_name).then(function(text) {
					global.my_name = text[1];
				})
				.moveToObject(this.selector.first_product_home_page)
				.waitForExist(this.selector.details_first_product_home_page, 30000)
				.click(this.selector.details_first_product_home_page)
				.waitForExist(this.selector.first_product_home_page_name, 30000)
				.getText(this.selector.product_name_details).then(function(text) {
					var my_name_check = text;
					should(my_name_check).be.equal(my_name);
				})
				.getText(this.selector.product_price_details).then(function(text) {
					global.my_price = text;
				})
				.getValue(this.selector.product_quantity_details).then(function(text) {
					global.my_quantity = text;
				})
				.click(this.selector.add_to_cart)
				.waitForExist(this.selector.layer_cart, 30000)				
				.getText(this.selector.layer_cart_name_details).then(function(text) {
					var my_cart_name_check = text;
					should(my_cart_name_check).be.equal(my_name);
				})
				.getText(this.selector.layer_cart_price_details).then(function(text) {
					var my_cart_price_check = text;
					should(my_cart_price_check).be.equal(my_price);
				})
				.getText(this.selector.layer_cart_quantity_details).then(function(text) {
					var my_cart_quantity_check = text;
					should(my_cart_quantity_check).be.equal(my_quantity);
				})
				.click(this.selector.layer_cart_command_button)
				.call(done);
		});
		
		it('validate_the_cart', function(done){
			this.client			
				.waitForExist(this.selector.command_button_checkout, 30000)
				.click(this.selector.command_button_checkout)
				.waitForExist(this.selector.command_button_checkout_step3, 80000)
				.click(this.selector.command_button_checkout_step3)
				.waitForExist(this.selector.command_cgv, 30000)
				.click(this.selector.command_cgv)
				.click(this.selector.command_button_checkout)
				.waitForExist(this.selector.command_product_name_step5, 30000)
				.getText(this.selector.command_product_name_step5).then(function(text) {
					var my_name_check2 = text;
					should(my_name_check2).be.equal(my_name);
				})
				.getText(this.selector.command_total_price).then(function(text) {
					var my_price_check = text;
					should(my_price_check).be.equal(my_price);
				})
				.click(this.selector.command_pay_bankwire)
				.waitForExist(this.selector.command_price_step5_amout, 30000)
				.getText(this.selector.command_price_step5_amout).then(function(text) {
					var my_price_check2 = text;
					should(my_price_check2).be.equal(my_price);
				})
				.click(this.selector.command_confirm_button)
				.waitForExist(this.selector.command_success_alert, 30000)
				.getText(this.selector.command_success_price).then(function(text) {
					var my_price_check3 = text;
					should(my_price_check3).be.equal(my_price);
				})
				.call(done);
		});
		
		it('order_id', function(done){
			this.client
				.url().then(function(res) {
						var current_url = res.value;
						var temp1 =current_url.split("id_order=");
						var temp2 = temp1[1].split("&");
						global.order_id=temp2[0];
					})
				.call(done);
		});
		
		it('logout_FO', function(done){
			this.client
				//.signoutFO()
                                .waitForExist(this.selector.logoutFO, 30000)
			        .click(this.selector.logoutFO)
			        .waitForExist(this.selector.access_loginFO, 30000)
				.call(done);
		});
	
});