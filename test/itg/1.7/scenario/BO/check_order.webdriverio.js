'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');

describe('The Check of the order in Back Office', function(){
	common.initMocha.call(this);
	
	before(function(done){
		this.selector = globals.selector;
		this.client.call(done);
	});
	after(common.after);
	
	describe('Log in in Back Office', function(done){
        it('should log in successfully in BO', function(done){
		    this.client
			.signinBO()
			.call(done);
		});
	});
	
	describe('Check the order', function(done){
        it('should go to the orders page', function(done){
		    this.client
			.waitForExist(this.selector.menu, 90000)
			.click(this.selector.orders)
			.waitForExist(this.selector.orders_form, 90000)
			.call(done);
	    });
	
	    it('should check the order id', function(done){
	        this.client
			var my_selector = "//td[contains(@onclick,'&id_order=" + order_id + "&')]";
			this.client
			.waitForExist(my_selector, 90000)
			.click(my_selector)
            //.click(this.selector.close_error)
            .pause(5000)
            .call(done);
        });
        it('should check the product name', function(done){
	        this.client
            .scroll(this.selector.order_product_name,20,0)
			.waitForExist(this.selector.order_product_name, 90000)
			.getText(this.selector.order_product_name).then(function(text) {
				var my_order_product_name = text;
				my_order_product_name.toLowerCase().should.containEql(my_name.toLowerCase());
			})
			.call(done);
		});
		it('should check the product quantity', function(done){
	        this.client
			.waitForExist(this.selector.order_quantity, 90000)
			.getText(this.selector.order_quantity).then(function(text) {
				var my_order_quantity = text;
				should(my_order_quantity).be.equal(my_quantity);
			})
			.call(done);
		});
		it('should check the order total', function(done){
	        this.client
			.waitForExist(this.selector.order_total, 90000)
			.getText(this.selector.order_total).then(function(text) {
				var my_order_total = text;
				should(my_order_total).be.equal(my_price);
			})
			.call(done);
		});
		it('should check the order reference', function(done){
	        this.client
			.waitForExist(this.selector.order_reference, 90000)
			.getText(this.selector.order_reference).then(function(text) {
				var my_order_reference = text;
				should(my_order_reference).be.equal(order_reference);
			})
			.pause(5000)
			.call(done);
		});
	});
	
	describe('Log out in Back Office', function(done){
        it('should log out successfully in BO', function(done){
		    this.client
			.signoutBO()
			.call(done);
		});
	});
});