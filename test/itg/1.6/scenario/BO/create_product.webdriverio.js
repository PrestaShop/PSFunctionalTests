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
		
		it('go_to_new_product', function(done){
			this.client
				.waitForExist(this.selector.menu, 60000)
				.click(this.selector.products)
				.waitForExist(this.selector.new_product, 60000)
				.call(done);
		});
		
		it('create_new_product', function(done){			
				this.client
				.click(this.selector.new_product)
				.waitForExist(this.selector.product_name, 60000)
				.setValue(this.selector.product_name, 'test_nodejs_' + product_id)
				.frame(this.selector.summary, function (err, result){
					if (err) console.log(err);
					})
				.setValue("#tinymce", "this the summary")
				.frameParent()
				.pause(2000)
				.frame(this.selector.description, function (err, result){
					if (err) console.log(err);
					})
				.setValue("#tinymce", "this is the description")
				.frameParent()
				.pause(2000)
				.click(this.selector.save_and_stay_product)
				.waitForExist(this.selector.close_green_validation, 60000)
				.click(this.selector.close_green_validation)
				.click(this.selector.product_price)
				.waitForExist(this.selector.wholesale_price, 60000)
				.click(this.selector.wholesale_price)
				.pause(2000)
				.setValue(this.selector.wholesale_price, "2")
				.click(this.selector.priceTE)
				.pause(2000)
				.setValue(this.selector.priceTE, "5")
				.waitForExist(this.selector.save_and_stay_price, 60000)
				.click(this.selector.save_and_stay_price)
				.waitForExist(this.selector.close_green_validation, 60000)
				.click(this.selector.close_green_validation)
				.click(this.selector.product_quantity)
				.waitForExist(this.selector.quantity, 60000)
				.click(this.selector.quantity)
				.addValue(this.selector.quantity, "1000")
				.click(this.selector.product_picture)
				.waitForExist(this.selector.picture, 60000)
				.execute(function() {
					document.getElementById("file").style="";
					})
				.chooseFile(this.selector.picture, toUpload)
				.pause(3000)
				.waitForExist(this.selector.upload_file_button, 60000)
				.click(this.selector.upload_file_button)
				.waitForExist(this.selector.upload_succes, 60000)
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
				.click(this.selector.products)
				.waitForExist(this.selector.catalogue_filter_by_name, 60000)
				.setValue(this.selector.catalogue_filter_by_name, 'test_nodejs_' + product_id)
				.click(this.selector.catalogue_submit_filter)
				.click(this.selector.edit_product)
				.waitForExist(this.selector.product_name, 60000)
				.call(done);
		});
				
		it('check_product_in_BO', function(done){		
				this.client
					.getValue(this.selector.product_name).then(function(text) {
						var my_name = text;
						should(my_name).be.equal('test_nodejs_' + product_id);
					})
					.pause(60000)
					.frame(this.selector.summary, function (err, result){
						if (err) console.log(err);
						})
					.getText("#tinymce").then(function(text) {
						var my_summary = text;
						should(my_summary).be.equal("this the summary");
					})
					.frameParent()
					.frame(this.selector.description, function (err, result){
						if (err) console.log(err);
						})
					.getText("#tinymce").then(function(text) {
						var my_description = text;
						should(my_description).be.equal("this is the description");
					})
					.frameParent()
					.click(this.selector.product_price)	
					.waitForExist(this.selector.wholesale_price, 60000)
					.getValue(this.selector.wholesale_price).then(function(text) {
						var my_wholesale_price = text;
						should(parseInt(my_wholesale_price)).be.equal(parseInt("2"));
					})
					.getValue(this.selector.priceTE).then(function(text) {
						var my_priceTE = text;
						should(parseInt(my_priceTE)).be.equal(parseInt("5"));
					})	
					.click(this.selector.product_quantity)
					.waitForExist(this.selector.quantity, 60000)
					.getValue(this.selector.quantity).then(function(text) {
						var my_quantity = text;
						should(parseInt(my_quantity)).be.equal(parseInt("1000"))
					})	
					.click(this.selector.product_picture)
					.waitForExist(this.selector.upload_file_button, 60000)
					.getAttribute('img[title=' + 'test_nodejs_' + product_id + ']', "src").then(function(text) {
						var my_src_temp = text[0];
						var my_src_temp2 = my_src_temp.split("/img");
						var my_src_temp3 = my_src_temp2[1].split("?time");
						should(my_src_temp3[0]).be.equal(src_creation);
					})
					.call(done);
		});
		
		it('logout_BO', function(done){
			this.client
				.signoutBO()
				.call(done);
		});

});