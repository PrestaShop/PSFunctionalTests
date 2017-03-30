'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');

describe('The Check of the Product in Front Office', function(){
	common.initMocha.call(this);

	before(function(done){
		this.selector = globals.selector;
		this.client.call(done);
	});
    process.on('uncaughtException', common.take_screenshot);
    process.on('ReferenceError', common.take_screenshot);
	after(common.after);

	describe('Open the shop', function(done){
		it('should acces to the Front Office', function(done){
		    global.fctname= this.test.title;
			this.client
				.url('http://' + URL + '/en/')
				.call(done);
		});
	});

	describe('Check the product', function(done){
		it('should search for the product', function(done){
		    global.fctname= this.test.title;
			this.client
				.waitForExist(this.selector.search_product, 90000)
				.setValue(this.selector.search_product, 'test_nodejs_' + product_id)
				.click(this.selector.search_product_button)
				.call(done);
		});

        it('should check the product name', function(done){
            global.fctname= this.test.title;
			this.client
				.waitForExist(this.selector.search_product_result_name, 90000)
				.getText(this.selector.search_product_result_name).then(function(text) {
					var my_name = text;
					should(my_name.toLowerCase()).be.equal('test_nodejs_' + product_id);
				})
				.call(done);
		});

		it('should check the product price', function(done){
		    global.fctname= this.test.title;
			this.client
				.getText(this.selector.search_product_result_price).then(function(text) {
					var my_price = text;
					should(my_price).be.equal("€6.00");
				})
				.call(done);
		});

		it('should check the product details', function(done){
		    global.fctname= this.test.title;
			this.client
				.click(this.selector.search_product_result_name)
				.waitForExist(this.selector.product_name_details, 90000)
				.getText(this.selector.product_name_details).then(function(text) {
					var my_name_check = text[2];
					should(my_name_check.toLowerCase()).be.equal('test_nodejs_' + product_id);
				})
				//image_data_id
				.getAttribute('img[class="js-qv-product-cover"]', "src").then(function(text) {
					var my_src_temp = text;
					my_src_temp.should.containEql(image_data_id + '-large_default');
				})
				.getText(this.selector.product_price_details).then(function(text) {
					var my_price2 = text;
					should(my_price2).be.equal("€6.00");
				})
				.call(done);
		});

    });
});