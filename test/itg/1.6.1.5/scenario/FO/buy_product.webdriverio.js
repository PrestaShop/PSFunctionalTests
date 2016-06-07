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
				.signinFO()
				.call(done);
		});
		
		it('add_product_to_cart', function(done){
			this.client
				.click2(this.selector.logo_home_pageFO)
				.waitForVisible(this.selector.first_product_home_page, 5000)
				.getText(this.selector.first_product_home_page_name).then(function(text) {
					global.my_name = text[1];
				})
				.moveToObject(this.selector.first_product_home_page)
				.waitForVisible(this.selector.details_first_product_home_page, 5000)
				.click2(this.selector.details_first_product_home_page)
				.waitForVisible(this.selector.first_product_home_page_name, 5000)
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
				.click2(this.selector.add_to_cart)
				.waitForVisible(this.selector.layer_cart_name_details, 5000)				
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
				.click2(this.selector.layer_cart_command_button)
				.call(done);
		});
		
		it('validate_the_cart', function(done){
			this.client			
				.waitForVisible(this.selector.command_button_checkout, 5000)
				.click2(this.selector.command_button_checkout)
				.waitForVisible(this.selector.command_button_checkout_step3, 5000)
				.click2(this.selector.command_button_checkout_step3)
				.waitForVisible(this.selector.command_cgv, 5000)
				.click2(this.selector.command_cgv)
				.click2(this.selector.command_button_checkout)
				.waitForVisible(this.selector.command_product_name_step5, 5000)
				.getText(this.selector.command_product_name_step5).then(function(text) {
					var my_name_check2 = text;
					should(my_name_check2).be.equal(my_name);
				})
				.getText(this.selector.command_total_price).then(function(text) {
					var my_price_check = text;
					should(my_price_check).be.equal(my_price);
				})
				.click2(this.selector.command_pay_bankwire)
				.waitForVisible(this.selector.command_price_step5_amout, 5000)
				.getText(this.selector.command_price_step5_amout).then(function(text) {
					var my_price_check2 = text;
					should(my_price_check2).be.equal(my_price);
				})
				.click2(this.selector.command_confirm_button)
				.waitForVisible(this.selector.command_success_alert, 5000)
				.getText(this.selector.command_success_price).then(function(text) {
					var my_price_check3 = text;
					should(my_price_check3).be.equal(my_price);
				})
				.call(done);
		});
		
		it('order_id', function(done){
			this.client
				.url(function(err,res) {
						var current_url = res.value;
						var temp1 = current_url.split("id_order=");	
						var temp2 = temp1[1].split("&");
						global.order_id=temp2[0];
					})
				.call(done);
		});
		
		it('logout_FO', function(done){
			this.client
				.signoutFO()
				.call(done);
		});
	
});