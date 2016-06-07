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
				.click(this.selector.description_button)
				.frame(this.selector.description, function (err, result){
					if (err) console.log(err);
					})
				.setValue2("#tinymce", "this is the description")
				.frameParent()
				.pause(500)
				.setValue2(this.selector.priceTE_shortcut, "5")
				.addValue(this.selector.quantity_shortcut, "10")
				.execute(function() {
					document.getElementsByClassName("dz-hidden-input").style="";
					})
				.chooseFile(this.selector.picture, toUpload)
				.waitFor(this.selector.picture_cover, 5000)
				.getAttribute('.dz-preview.dz-image-preview.ui-sortable-handle.dz-complete', "data-id").then(function(text) {
					global.image_data_id = text;
				})
				.click2(this.selector.product_online)
				.click2(this.selector.save_product)
				.waitFor(this.selector.close_green_validation, 5000)
				.click2(this.selector.close_green_validation)
				.call(done);
		});
		
		
		it('check_catalogue', function(done){
			this.client
				.click2(this.selector.go_to_catalog)
				.waitFor(this.selector.catalogue_filter_by_name, 5000)
				.setValue2(this.selector.catalogue_filter_by_name, 'test_nodejs_' + product_id)
				.click2(this.selector.catalogue_submit_filter)
				.waitFor('//a[text()="test_nodejs_' + product_id + '"]', 5000)
				.click2('//a[text()="test_nodejs_' + product_id + '"]')
				.waitFor(this.selector.product_name)
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
				this.client.click(this.selector.description_button)
				this.client.frame(this.selector.description, function (err, result){
					if (err) console.log(err);
					})
				this.client.getText("#tinymce").then(function(text) {
					var my_description = text;
					should(my_description).be.equal("this is the description");
				});
				this.client.frameParent();
				this.client.getValue(this.selector.priceTE_shortcut).then(function(text) {
					var my_priceTE = text;
					should(parseInt(my_priceTE)).be.equal(parseInt("5"));
				});	
				this.client.getValue(this.selector.quantity_shortcut).then(function(text) {
					var my_quantity = text;
					should(parseInt(my_quantity)).be.equal(parseInt("10"));
				});	
				this.client.getAttribute('div[data-id="' + image_data_id + '"] > div ', "style").then(function(text) {
					var my_picture_url_temp = text[0].split("url(\"");
					var my_picture_url = my_picture_url_temp[1].split("\")");
					should(my_picture_url[0]).be.equal(picture_url);
				})
				this.client.call(done);
		});
		
		it('logout BO', function(done){
			this.client
				.signoutBO2()
				.call(done);
		});

});