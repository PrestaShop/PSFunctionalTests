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
	
		it('loggin BO', function(done){
			this.client
				.signinBO()
				.call(done);
		});	

		
		it('go_to_new_product', function(done){
			this.client
				.waitForExist(this.selector.menu, 30000)
				.click(this.selector.products)
				.waitForExist(this.selector.new_product, 30000)
				.call(done);
		});
		
		it('create_new_product', function(done){			
				this.client
				.click(this.selector.new_product)
				.waitForExist(this.selector.product_name, 30000)
				.setValue(this.selector.product_name, 'test_nodejs_' + product_id)
				.frame(this.selector.summary, function (err, result){
					if (err) console.log(err);
					})
				.setValue("#tinymce", "this the summary")
				.frameParent()
				.pause(2000)
				.click(this.selector.description_button)
				.frame(this.selector.description, function (err, result){
					if (err) console.log(err);
					})
				.setValue("#tinymce", "this is the description")
				.frameParent()
				.pause(2000)
				.setValue(this.selector.priceTE_shortcut, "5")
				.addValue(this.selector.quantity_shortcut, "10")
				.execute(function() {
					document.getElementsByClassName("dz-hidden-input").style="";
					})
				.chooseFile(this.selector.picture, toUpload)
				.waitForExist(this.selector.picture_cover, 30000)
				.getAttribute('.dz-preview.dz-image-preview.ui-sortable-handle.dz-complete', "data-id").then(function(text) {
					global.image_data_id = text;
				})
				.click(this.selector.product_online)
				.click(this.selector.save_product)
				.waitForExist(this.selector.close_green_validation, 30000)
				.click(this.selector.close_green_validation)
				.call(done);
		});
		
		
		it('check_catalogue', function(done){
			this.client
				.click(this.selector.go_to_catalog)
				.waitForExist(this.selector.catalogue_filter_by_name, 30000)
				.setValue(this.selector.catalogue_filter_by_name, 'test_nodejs_' + product_id)
				.click(this.selector.catalogue_submit_filter)
				.waitForExist('//a[text()="test_nodejs_' + product_id + '"]', 30000)
				.click('//a[text()="test_nodejs_' + product_id + '"]')
				.waitForExist(this.selector.product_name, 30000)
				.call(done);
		});
				
		it('generate_picture_url', function(done){
			global.picture_url = "/" + URL.split("/").pop(-1) + "/img/p";
			for (var i = 0, len = image_data_id.length; i < len; i++) {
				picture_url= picture_url + "/" + image_data_id[i];
			}
			picture_url = picture_url + "/" + image_data_id + "-home_default.jpg";
			this.client.call(done);
		});
				
		it('check_product', function(done){		
				this.client
				.getValue(this.selector.product_name).then(function(text) {
					var my_name = text;
					should(my_name).be.equal('test_nodejs_' + product_id);
				})
				.frame(this.selector.summary, function (err, result){
					if (err) console.log(err);
					})
				.getText("#tinymce").then(function(text) {
					var my_summary = text;
					should(my_summary).be.equal("this the summary");
				})
				.frameParent()
				.click(this.selector.description_button)
				.frame(this.selector.description, function (err, result){
					if (err) console.log(err);
					})
				.getText("#tinymce").then(function(text) {
					var my_description = text;
					should(my_description).be.equal("this is the description");
				})
				.frameParent()
				.getValue(this.selector.priceTE_shortcut).then(function(text) {
					var my_priceTE = text;
					should(parseInt(my_priceTE)).be.equal(parseInt("5"));
				})
				.getValue(this.selector.quantity_shortcut).then(function(text) {
					var my_quantity = text;
					should(parseInt(my_quantity)).be.equal(parseInt("10"));
				})
				.getAttribute('div[data-id="' + image_data_id + '"] > div ', "style").then(function(text) {
					var my_picture_url_temp = text[0].split("url(\"");
					var my_picture_url = my_picture_url_temp[1].split("\")");
					should(my_picture_url[0]).be.equal(picture_url);
				})
				.call(done);
		});
		
		it('logout BO', function(done){
			this.client
				.signoutBO2()
				.call(done);
		});

});