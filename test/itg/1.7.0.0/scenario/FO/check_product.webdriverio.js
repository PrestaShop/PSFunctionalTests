'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');

describe('check_product', function(){
	common.initMocha.call(this);
	
	before(function(done){
		this.selector = globals.selector;
		this.client.call(done);
	});

	after(common.after);
		
		it('open FO', function(done){
			this.client
				.url('http://' + URL)
				.call(done);
		});
		
		it('open_the_product', function(done){
			this.client
				.setValue(this.selector.search_product, 'test_nodejs_' + product_id)
				.click(this.selector.search_product_button)
				.waitForExist(this.selector.search_product_result_name, 5000)
				.getText(this.selector.search_product_result_name).then(function(text) {
					var my_name = text;
					should(my_name.toLowerCase()).be.equal('test_nodejs_' + product_id);
				})
				.getText(this.selector.search_product_result_price).then(function(text) {
					var my_price = text;
					should(parseInt(my_price)).be.equal(parseInt("6"));
				})
				.click(this.selector.search_product_result_name)
				.getText(this.selector.product_name_details).then(function(text) {
					var my_name_check = text[1];
					should(my_name_check).be.equal('test_nodejs_' + product_id);
				})
				//image_data_id
				.getAttribute('img[class="js-qv-product-cover"]', "src").then(function(text) {
					var my_src_temp = text;
					my_src_temp.should.containEql(image_data_id + '-medium_default');
				})
				.getText(this.selector.product_price_details).then(function(text) {
					var my_price2 = text;
					should(parseInt(my_price2)).be.equal(parseInt("6"));
				})
				.call(done);
		});

});