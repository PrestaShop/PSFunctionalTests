'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');


describe('check_product_in_FO', function(){
	common.initMocha.call(this);
	
	before(function(done){
		this.selector = globals.selector;
		this.client.call(done);
	});

	after(common.after);
		
		it('open_FO', function(done){
			this.client
				.url('http://' + URL)
				.call(done);
		});
		
		it('open_the_product', function(done){
			this.client
                .waitForExist(this.selector.search_product, 30000)                                
                .click(this.selector.search_product)
				.setValue(this.selector.search_product, 'test_nodejs_' + product_id)
				.pause(1000)
				.getValue(this.selector.search_product).then(function(text) {
					console.log("search value: " + text)
				})
				.click(this.selector.search_product_button)
				.waitForExist(this.selector.search_product_result_name, 30000)
				.getText(this.selector.search_product_result_name).then(function(text) {
					var my_name = text;
					should(my_name[1]).be.equal('test_nodejs_' + product_id);
				})
			/*	.getText(this.selector.search_product_result_price).then(function(text) {
					var my_price = text;
					should(parseInt(my_price[1])).be.equal(parseInt("6"));
				})*/
				.moveToObject(this.selector.search_product_result_name)
				.waitForExist(this.selector.search_product_details, 30000)
				.click(this.selector.search_product_details)
                .waitForExist(this.selector.product_name_details, 30000)
				.getText(this.selector.product_name_details).then(function(text) {
					var my_name_check = text;
					should(my_name_check).be.equal('test_nodejs_' + product_id);
				})
				.getAttribute('img[title=' + 'test_nodejs_' + product_id + ']', "src").then(function(text) {
					var my_src_temp = text[0].split("/").pop().split('.');
					var my_name_modify = 'testnodejs' + product_id;
					my_src_temp[0].should.be.equal(my_name_modify);
				})
				.getText(this.selector.product_price_details).then(function(text) {
					var my_price2 = text;
					should(parseInt(my_price2)).be.equal(parseInt("6"));
				})
				.call(done);
		});

});