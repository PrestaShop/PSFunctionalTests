'use strict';
var common = require('./common.webdriverio');
var path = require('path');
var should = require('should');
var argv = require('minimist')(process.argv.slice(2));
var date_time = new Date().getTime();


global.URL = argv.URL;
global.module_tech_name = argv.MODULE;
global.saucelabs = argv.SAUCELABS;
global._projectdir = path.join(__dirname, '..', '..');
global.product_id=new Date().getTime();
global.new_customer_email = 'pub' + date_time + '@prestashop.com';


module.exports = {
    selector: {
	//BO
		login: '#email',
		password: '#passwd',
		login_btn: '#login_form > div.form-group.row-padding-top > button',
        profil: '#employee_infos',
		logout: '#header_logout',
		products: '#maintab-AdminCatalog > a',
		new_product: '#page-header-desc-product-new_product',
		product_name: '#name_1',
		save_and_stay_product: '[name="submitAddproductAndStay"]',
		save_button: '[name="submitAddproduct"]',
		green_validation: '.alert.alert-success',
		close_green_validation: '.alert.alert-success > .close',
		menu: '#nav-sidebar',
		number_of_products: ".badge",
		summary: 'description_short_1_ifr', //not declare like an id because using into function "frame" that not need this information;
		description: 'description_1_ifr',//not declare like an id because using into function "frame" that not need this information;
		product_price: '#link-Prices',
		wholesale_price: '#wholesale_price',
		priceTE: '#priceTE',
		priceTI: '#priceTI',
		//save_and_stay_price: '#product-prices > div.panel-footer > button:nth-child(3)',
		save_and_stay_price: '(//div[@id="product-prices"]/div/button[@class="btn btn-default pull-right"])[2]/i[@class="process-icon-save"]',
		product_quantity: '#link-Quantities',
		quantity: '[name="qty_0"]',
		save_and_stay_quantity: '#product-quantities > div.panel-footer > button:nth-child(3)',
		close_false_error: '.growl-close',
		product_picture: '#link-Images',
		picture: '#file',
		upload_file_button: '#file-upload-button',
		upload_succes: '.alert.alert-success',
		catalogue_filter_by_name: '[name="productFilter_b!name"]',
		catalogue_submit_filter: '#submitFilterButtonproduct',
		edit_product: '.edit.btn.btn-default',
		orders: '#maintab-AdminParentOrders',
		orders_form: '#form-order',
		order_product_name: '.productName',
		order_quantity: '.product_quantity_show',
		order_total: '#total_order > td.amount.text-right.nowrap',
		new_order: '.process-icon-new',
		new_order_client: '#customer',
		new_order_client_choose: '[data-customer="1"]',
		new_order_product: '#product',
		new_order_product_name_list:'#id_product',
		new_order_product_name_choose:'(//select[@id="id_product"]/option)[1]',
		new_order_product_combination_list: '//select[@class="id_product_attribute" and @style=""]',
		new_order_product_combination_1: '(//select[@class="id_product_attribute" and @style=""]/option)[1]',
		modules_menu: '.icon-AdminParentModules',
		modules_search: '#moduleQuicksearch',


	//FO
		access_loginFO:'.login',
		loginFO: '#email',
		passwordFO: '#passwd',
		login_btnFO: '#SubmitLogin',
		logoutFO: '.logout',
		create_account: '#email_create',
		create_account_button: '#SubmitCreate',
		create_account_firstname: '#customer_firstname',
		create_account_lastname: '#customer_lastname',
		create_account_email: '#email',
		create_account_password: '#passwd',
		create_account_info_validate: '#submitAccount',
		logo_home_pageFO: '.logo.img-responsive',
		first_product_home_page: '.product_img_link',
		details_first_product_home_page: '.button.lnk_view.btn.btn-default',
		add_to_cart: '[name="Submit"]',
		cart_label: '#columns > div.breadcrumb.clearfix',
		first_product_home_page_name: '.product-name',
		product_name_details: '[itemprop="name"]',
		product_price_details: '#our_price_display',
		product_quantity_details: '#quantity_wanted',
        layer_cart: '//div[@id="layer_cart" and contains(@style, "display: block;")]',
		layer_cart_picture: '.layer_cart_img.img-responsive',
		layer_cart_name_details: 'span#layer_cart_product_title',
		layer_cart_price_details: 'span#layer_cart_product_price',
		layer_cart_quantity_details: 'span#layer_cart_product_quantity',
		layer_cart_command_button: '.btn.btn-default.button.button-medium',
		command_button_checkout: '.button.btn.btn-default.standard-checkout.button-medium',
		command_button_checkout_step3: '//button[@name="processAddress"]',
		command_cgv: '#cgv',
		command_product_name_step5: '.cart_description > p > a',
		command_total_price: '#total_price',
		command_pay_bankwire: '.bankwire',
		command_price_step5_amout: '#amount',
		command_confirm_button: '#cart_navigation > button',
		command_success_alert: '.alert.alert-success',
		command_success_price: '.price > strong',		
		search_product: '#search_query_top',
		search_product_button: '[name="submit_search"]',
		search_product_result_image: '[itemprop="image"]',
		search_product_result_name: '[itemprop="url"]',
		search_product_result_price: '.price.product-price',
		search_product_details: '.button.lnk_view.btn.btn-default',
		check_login_ok: '//ul[@class="myaccount-link-list"]',
		validate_address: '//button[@id="submitAddress"]',
	},
    shouldExist: function(err, existing) {
        should(err).be.not.defined;
        should(existing).be.true;
    }
};
