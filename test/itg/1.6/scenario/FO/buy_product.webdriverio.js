'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');


describe('The Purchase of a product', function(){
	common.initMocha.call(this);
	
	before(function(done){
		this.selector = globals.selector;
		this.client.call(done);
	});

	after(common.after);
		
		/*it('loggin_FO', function(done){
            this.client
           		.signinFO()
           		.call(done);
		});*/

	describe('Add product to cart', function(done){
		it('should access to the Front Office', function(done){
		    this.client
			    .url('http://' + URL)
                .waitForExist(this.selector.logo_home_pageFO, 60000)
                .call(done);
		});

		it('should go to the product details page', function(done){
			this.client
				.click(this.selector.logo_home_pageFO)
				.waitForExist(this.selector.first_product_home_page, 60000)
				.getText(this.selector.first_product_home_page_name).then(function(text) {
					global.my_name = text[1];
				})
				.moveToObject(this.selector.first_product_home_page)
				.waitForExist(this.selector.details_first_product_home_page, 60000)
				.click(this.selector.details_first_product_home_page)
				.waitForExist(this.selector.first_product_home_page_name, 60000)
				.call(done);
		});

        it('should add the product to the cart', function(done){
			this.client
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
				.waitForExist(this.selector.layer_cart, 60000)				
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
				.call(done);
		});

		it('should checkout', function(done){
			this.client
				.click(this.selector.layer_cart_command_button)
				.waitForExist(this.selector.cart_label,60000)
				.call(done);
		});
    });

	describe('Validate the cart', function(){
		it('should validate the summary step (step 1)', function(done){
			this.client			
				.waitForExist(this.selector.command_button_checkout, 60000)
				.click(this.selector.command_button_checkout)
				.pause(3000)
				.waitForExist(this.selector.loginFO, 90000)
				.call(done);
		});

		it('should validate the log in step (step 2)', function(done){
			this.client
                .setValue(this.selector.loginFO, 'pub@prestashop.com')
                .setValue(this.selector.passwordFO, '123456789')
                .click(this.selector.login_btnFO)
				/*.waitForExist(this.selector.validate_address, 60000)
				.click(this.selector.validate_address)*/
				.waitForExist(this.selector.command_button_checkout_step3, 60000)
				.call(done);
		});

		it('should validate the adresses step (step 3)', function(done){
			this.client
				.click(this.selector.command_button_checkout_step3)
				.waitForExist(this.selector.command_cgv, 60000)
				.call(done);
		});

		it('should validate the shipping step (step 4)', function(done){
			this.client
				.click(this.selector.command_cgv)
				.click(this.selector.command_button_checkout)
				.waitForExist(this.selector.command_product_name_step5, 60000)
		        .call(done);
		});

		it('should validate the payment step (step 5)', function(done){
			this.client
				.getText(this.selector.command_product_name_step5).then(function(text) {
					var my_name_check2 = text;
					should(my_name_check2).be.equal(my_name);
				})
				.getText(this.selector.command_total_price).then(function(text) {
					var my_price_check = text;
					should(my_price_check).be.equal(my_price);
				})
				.click(this.selector.command_pay_bankwire)
				.waitForExist(this.selector.command_price_step5_amout, 60000)
				.getText(this.selector.command_price_step5_amout).then(function(text) {
					var my_price_check2 = text;
					should(my_price_check2).be.equal(my_price);
				})
				.click(this.selector.command_confirm_button)
				.waitForExist(this.selector.command_success_alert, 60000)
				.getText(this.selector.command_success_price).then(function(text) {
					var my_price_check3 = text;
					should(my_price_check3).be.equal(my_price);
				})
				.call(done);
		});
		
		it('should get the order id', function(done){
			this.client
				.url().then(function(res) {
						var current_url = res.value;
						var temp1 =current_url.split("id_order=");
						var temp2 = temp1[1].split("&");
						global.order_id=temp2[0];
					})
				.call(done);
		});
    });

	describe('Log out in Front Office', function(done){
		it('should logout successfully in FO', function(done){
			this.client
				.waitForExist(this.selector.logoutFO, 60000)
			    .click(this.selector.logoutFO)
			    .waitForExist(this.selector.access_loginFO, 60000)
				.call(done);
		});
	});
	
});