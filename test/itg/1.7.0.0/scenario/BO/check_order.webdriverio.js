'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');

describe('check the order in BO', function(){
	common.initMocha.call(this);
	
	before(function(done){
		this.selector = globals.selector;
		this.client.call(done);
	});
	after(common.after);
	
	it('loggin BO', function(done){
		this.client
			.signinBO()
			.call(done);
	});
	
	it('go_to_order', function(done){
		this.client
			.waitForExist(this.selector.menu, 60000)
			.click(this.selector.orders)
			.waitForExist(this.selector.orders_form, 60000)
			.call(done);
	});
	
	it('check_order', function(done){
			var my_selector = "//td[contains(@onclick,'&id_order=" + order_id + "&')]";
			this.client
			.waitForExist(my_selector, 60000)
			.click(my_selector)
			.waitForExist(this.selector.order_product_name, 60000)
			.getText(this.selector.order_product_name).then(function(text) {
				var my_order_product_name = text;
				my_order_product_name.toLowerCase().should.containEql(my_name.toLowerCase());
			})
			.getText(this.selector.order_quantity).then(function(text) {
				var my_order_quantity = text;
				should(my_order_quantity).be.equal(my_quantity);
			})
			.getText(this.selector.order_total).then(function(text) {
				var my_order_total = text;
				should(my_order_total).be.equal(my_price);
			})
			.getText(this.selector.order_reference).then(function(text) {
				var my_order_reference = text;
				should(my_order_reference).be.equal(order_reference);
			})
			.pause(5000)
			.call(done);
	});
	
	it('logout BO', function(done){
		this.client
			.signoutBO()
			.call(done);
	});
});