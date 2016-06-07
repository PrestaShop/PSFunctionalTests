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
		
		it('loggin FO', function(done){
			this.client
				.signinFO()
				.call(done);
		});
		
		it('add_product_to_cart', function(done){
			this.client
				.click2(this.selector.logo_home_pageFO)
				.waitFor(this.selector.first_product_home_page, 5000)
				.getText(this.selector.first_product_home_page_name).then(function(text) {
					global.my_name = text[1].split('...')[0];
				})
				.click2(this.selector.first_product_home_page)
				.waitFor(this.selector.product_image, 5000)
				.getText(this.selector.product_name_details).then(function(text) {
					var my_name_check = text;
					my_name_check.pop(-1).should.containEql(my_name);
				})
				.getText(this.selector.product_price_details).then(function(text) {
					global.my_price = text;
				})
				.getValue(this.selector.product_quantity_details).then(function(text) {
					global.my_quantity = text;
				})
				.click2(this.selector.add_to_cart)
				.waitFor(this.selector.layer_cart, 5000)			
				.getText(this.selector.layer_cart_name_details).then(function(text) {
					var my_cart_name_check = text;
					my_cart_name_check.toLowerCase().should.containEql(my_name.toLowerCase())
				})
				.getText(this.selector.layer_cart_price_details).then(function(text) {
					var my_cart_price_check = text;
					should(my_cart_price_check).be.equal(my_price);
				})
				.getText(this.selector.layer_cart_quantity_details).then(function(text) {
					var my_cart_quantity_check = text.split(': ');
					should(my_cart_quantity_check[1]).be.equal(my_quantity);
				})
				.click2(this.selector.layer_cart_command_button)
				.call(done);
		});
		
		it('validate_the_cart', function(done){
			this.client			
				.waitFor(this.selector.command_button_checkout, 5000)
				.getText(this.selector.command_product_name).then(function(text) {
					var command_my_name = text;
					command_my_name.toLowerCase().should.containEql(my_name.toLowerCase());
				})
				.getText(this.selector.command_product_price).then(function(text) {
					var command_price_check = text;
					should(command_price_check).be.equal(my_price);
				})
				/*.getText(this.selector.command_product_quantity).then(function(text) {
					var command_quantity_check = text.split(': ');
					should(command_quantity_check[1]).be.equal(my_quantity);
				})*/
				.click2(this.selector.command_button_checkout)
				.waitFor(this.selector.checkout_step2_continue_button, 5000)
				.click2(this.selector.checkout_step2_continue_button)
				.waitFor(this.selector.checkout_step3_continue_button, 5000)
				.click2(this.selector.checkout_step3_continue_button)
				.waitFor(this.selector.checkout_step4_payment, 5000)
				.getText(this.selector.checkout_total).then(function(text) {
					var checkout_total = text;
					should(checkout_total).be.equal(my_price);
				})
				.click2(this.selector.checkout_step4_payment)
				.click2(this.selector.checkout_step4_cgv)
				.click2(this.selector.checkout_step4_order)
				
				.getText(this.selector.order_confirmation_name).then(function(text) {
					var command_confirmation_my_name = text;
					command_confirmation_my_name.toLowerCase().should.containEql(my_name.toLowerCase());
				})
				.getText(this.selector.order_confirmation_price1).then(function(text) {
					var order_confirmation_price1 = text;
					should(order_confirmation_price1).be.equal(my_price);
				})
				.getText(this.selector.order_confirmation_price2).then(function(text) {
					var order_confirmation_price2 = text;
					should(order_confirmation_price2).be.equal(my_price);
				})
				.getText(this.selector.order_confirmation_ref).then(function(text) {
					global.order_reference=text;
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
		
		it('logout FO', function(done){
			this.client
				.signoutFO()
				.call(done);
		});
	
});