'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');
var path = require('path');
var toUpload = path.join(__dirname, '../..', 'datas', 'image_test.jpg');

describe('create_product', function(){
	common.initMocha.call(this);
	
	before(function(done){
		this.selector = globals.selector;
		this.client.call(done);
	});
	after(common.after);
	
		it('loggin_BO', function(done){
			this.client
				.signinBO()
				.call(done);
		});	

		console.log('dirname: ' + path.dirname(module.parent.filename));
		
		it('go_to_new_product', function(done){
			this.client
				.waitFor(this.selector.menu, 5000)
				.click2(this.selector.products)
				.waitFor(this.selector.new_product, 5000)
				.call(done);
		});
		
		it('create_new_product', function(done){			
				this.client
				.click2(this.selector.new_product)
				.waitFor(this.selector.product_name)
				.setValue2(this.selector.product_name, 'test_nodejs_' + product_id)
				.frame(this.selector.summary, function (err, result){
					if (err) console.log(err);
					})
				.setValue2("#tinymce", "this the summary")
				.frameParent()
				.pause(500)
				.frame(this.selector.description, function (err, result){
					if (err) console.log(err);
					})
				.setValue2("#tinymce", "this is the description")
				.frameParent()
				.pause(500)
				.click2(this.selector.save_and_stay_product)
				.waitFor(this.selector.close_green_validation, 5000)
				.click2(this.selector.close_green_validation)
				.click2(this.selector.product_price)
				.waitFor(this.selector.wholesale_price, 5000)
				.click2(this.selector.wholesale_price)
				.pause(500)
				.setValue2(this.selector.wholesale_price, "2")
				.click2(this.selector.priceTE)
				.pause(500)
				.setValue2(this.selector.priceTE, "5")
				.click2(this.selector.save_and_stay_price)
				.waitFor(this.selector.close_green_validation, 5000)
				.click2(this.selector.close_green_validation)
				.click2(this.selector.product_quantity)
				.waitFor(this.selector.quantity, 5000)
				.click2(this.selector.quantity)
				.addValue(this.selector.quantity, "10")
				.click2(this.selector.product_picture)
				.waitFor(this.selector.picture, 5000)
				.execute(function() {
					document.getElementById("file").style="";
					})
				.chooseFile(this.selector.picture, toUpload)
				.waitFor(this.selector.upload_file_button, 5000)
				.click2(this.selector.upload_file_button)
				.waitFor(this.selector.upload_succes, 5000)
				.getAttribute('img[title=' + 'test_nodejs_' + product_id + ']', "src").then(function(text) {
					var src_creation_temp = text;
					var src_creation_temp2 = src_creation_temp.split("/img");
					var src_creation_temp3 = src_creation_temp2[1].split("?time");
					global.src_creation = src_creation_temp3[0];
				})
				.call(done);
		});
		
		it('check_catalogue', function(done){
			this.client
				.click2(this.selector.products)
				.waitFor(this.selector.catalogue_filter_by_name, 5000)
				.setValue2(this.selector.catalogue_filter_by_name, 'test_nodejs_' + product_id)
				.click2(this.selector.catalogue_submit_filter)
				.click2(this.selector.edit_product)
				.waitFor(this.selector.product_name)
				.call(done);
		});
				
		it('check_product_in_BO', function(done){		
				this.client.getValue(this.selector.product_name).then(function(text) {
					var my_name = text;
					should(my_name).be.equal('test_nodejs_' + product_id);
				});		
				this.client.frame(this.selector.summary, function (err, result){
					if (err) console.log(err);
					})
				this.client.getText("#tinymce").then(function(text) {
					var my_summary = text;
					should(my_summary).be.equal("this the summary");
				});
				this.client.frameParent();
				this.client.frame(this.selector.description, function (err, result){
					if (err) console.log(err);
					})
				this.client.getText("#tinymce").then(function(text) {
					var my_description = text;
					should(my_description).be.equal("this is the description");
				});
				this.client.frameParent();
				this.client.click2(this.selector.product_price);	
				this.client.waitFor(this.selector.wholesale_price, 5000);
				this.client.getValue(this.selector.wholesale_price).then(function(text) {
					var my_wholesale_price = text;
					should(parseInt(my_wholesale_price)).be.equal(parseInt("2"));
				});	
				this.client.getValue(this.selector.priceTE).then(function(text) {
					var my_priceTE = text;
					should(parseInt(my_priceTE)).be.equal(parseInt("5"));
				});	
				this.client.click2(this.selector.product_quantity);
				this.client.waitFor(this.selector.quantity, 5000);
				this.client.getValue(this.selector.quantity).then(function(text) {
					var my_quantity = text;
					should(parseInt(my_quantity)).be.equal(parseInt("10"));
				});	
				this.client.product_picture;
				this.client.waitFor(this.selector.upload_file_button, 5000);
				this.client.getAttribute('img[title=' + 'test_nodejs_' + product_id + ']', "src").then(function(text) {
					var my_src_temp = text[0];
					var my_src_temp2 = my_src_temp.split("/img");
					var my_src_temp3 = my_src_temp2[1].split("?time");
					should(my_src_temp3[0]).be.equal(src_creation);
				})
				this.client.call(done);
		});
		
		it('logout_BO', function(done){
			this.client
				.signoutBO()
				.call(done);
		});

});