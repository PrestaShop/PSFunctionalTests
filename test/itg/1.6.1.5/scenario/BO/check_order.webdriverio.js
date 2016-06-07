'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');

describe('check_the_order_in_BO', function(){
	common.initMocha.call(this);
	
	before(function(done){
		this.selector = globals.selector;
		this.client.call(done);
	});
	after(common.after);
	
	try{
		it('loggin_BO', function(done){
			this.client
				.signinBO()
				.call(done);
		});
		
		it('go_to_order', function(done){
			this.client
				.waitFor(this.selector.menu, 5000)
				.click2(this.selector.orders)
				.waitFor(this.selector.orders_form, 5000)
				.call(done);
		});
		
		it('check_order', function(done){
				var my_selector = "//td[contains(@onclick,'&id_order=" + order_id + "&')]";
				this.client
				.waitFor(my_selector, 5000)
				.click2(my_selector)
				.waitFor(this.selector.order_product_name, 5000)
				.getText(this.selector.order_product_name).then(function(text) {
					var my_order_product_name = text;
					should(my_order_product_name).be.equal(my_name);
				})
				.getText(this.selector.order_quantity).then(function(text) {
					var my_order_quantity = text;
					should(my_order_quantity).be.equal(my_quantity);
				})
				.getText(this.selector.order_total).then(function(text) {
					var my_order_total = text;
					should(my_order_total).be.equal(my_price);
				})
				.pause(5000)
				.call(done);
		});
		
		it('logout_BO', function(done){
			this.client
				.signoutBO()
				.call(done);
		});
	}catch(e){
	};
});