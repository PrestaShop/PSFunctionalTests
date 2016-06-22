'use strict';
var common = require('./common.webdriverio');
var path = require('path');
var should = require('should');
var argv = require('minimist')(process.argv.slice(2));
var date_time = new Date().getTime();

global.URL = argv.URL;
global.module_tech_name = argv.MODULE;
global._projectdir = path.join(__dirname, '..', '..');
global.product_id=new Date().getTime();
global.new_customer_email = 'pub' + date_time + '@prestashop.com';

module.exports = {
    selector: {
	//BO
		login: '#email',
		password: '#passwd',
		login_btn: '[name="submitLogin"]',
		profil: '#employee_infos',
		new_profil: '.employee-dropdown.dropdown > div',
		logout: '#header_logout',
		products: '#subtab-AdminCatalog',
		go_to_catalog: '#product_form_save_go_to_catalog_btn',
		new_product: '#page-header-desc-configuration-add',
		menu: '#nav-sidebar',
		product_name: '#form_step1_name_1',
		save_product: '#submit',
		catalog_list: '#product_catalog_list',
		green_validation: '.growl.growl-notice.growl-medium',
		close_green_validation: '.growl-close',
		summary: 'form_step1_description_short_1_ifr', //not declare than an id because using into function "frame" that not need this information;
		description_button: '[href="#description"]',
		description: 'form_step1_description_1_ifr',//not declare than an id because using into function "frame" that not need this information;
		priceTE_shortcut: '#form_step1_price_shortcut',
		quantity_shortcut: '#form_step1_qty_0_shortcut',
		picture: '[class="dz-hidden-input"]',
		picture_cover: '.iscover',
		product_online: '.switch-input ',
		catalogue_filter_by_name: '[name="filter_column_name"]',
		catalogue_submit_filter: '[name="products_filter_submit"]',
		catalogue_filter_reset: '//button[@type="reset" and @style="display: inline-block;"]',
		orders: '#subtab-AdminParentOrders',
		orders_form: '#form-order',
		order_product_name: '.productName',
		order_quantity: '.product_quantity_show',
		order_total: '#total_order > td.amount.text-right.nowrap',
		order_reference: '#content > div.row > div > div:nth-child(5) > div.col-lg-7 > div:nth-child(1) > div.panel-heading > span:nth-child(2)',
		
		
		modules_menu: '#subtab-AdminModulesSf',
		modules_search: '.pstaggerAddTagInput.module-tags-input',
		modules_search_button: '.input-group-addon.module-search-icon',
		modules_page_loaded: '.module-search-result-wording',
		modules_installed: '(//div[@class="page-head-tabs"]/a)[2]',
		modules_validate_uninstall: '//a[@class="btn btn-primary uppercase module_action_modal_uninstall"]',
		
	//FO
		access_loginFO:'.login',
		loginFO: '[name="email"]',
		passwordFO: '[name="password"]',
		login_btnFO: '//footer[@class="form-footer text-xs-center clearfix"]/button[@type="submit" and @class="btn btn-primary"]',
		logoutFO: '.logout',
		
		//create_account: '#email_create',
		create_account_button: '[data-link-action="display-register-form"]',
		create_account_firstname: '[name="firstname"]',
		create_account_lastname: '[name="lastname"]',
		create_account_email: '[name="email"]',
		create_account_password: '[name="password"]',
		create_account_info_validate: '[data-link-action="save-customer"]',
		
		
		logo_home_pageFO: '.logo.img-responsive',
		first_product_home_page: '.thumbnail.product-thumbnail',
		add_to_cart: '.btn.btn-primary.add-to-cart',
		first_product_home_page_name: '[itemprop="name"]',
		product_image: '#content',
		product_name_details: '[itemprop="name"]',
		product_price_details: '[itemprop="price"]',
		product_quantity_details: '#quantity_wanted',
		layer_cart: '//div[@id="blockcart-modal" and @style="display: block;"]',
		layer_cart_name_details: '//div[@id="blockcart-modal"]/div/div/div[2]/div/div[1]/div/div[2]/h6',
		layer_cart_price_details: '//div[@id="blockcart-modal"]/div/div/div[2]/div/div[1]/div/div[2]/p[1]',
		layer_cart_quantity_details: '//div[@id="blockcart-modal"]/div/div/div[2]/div/div[1]/div/div[2]/p[2]',
		layer_cart_command_button: '//div[@id="blockcart-modal"]/div/div/div[2]/div/div[2]/div/a',
		command_product_name: '//div[@class="product-line-grid-body col-md-4"]/div[1]/a',
		command_product_price: '//div[@class="product-line-grid-body col-md-4"]/div[2]',
		command_product_quantity: '//div[@class="product-line-grid-body col-md-4"]/div[5]',
		command_button_checkout: 'div.checkout.cart-detailed-actions.card-block > div > a',
		check_out_step1: '#checkout-personal-information-step',
		check_out_step2: '#checkout-addresses-step',
		checkout_step2_continue_button: '[name="confirm-addresses"]',
		check_out_step3: '#checkout-delivery-step',
		checkout_step3_continue_button: '[name="confirmDeliveryOption"]',
		check_out_step4: '#checkout-payment-step',
		checkout_step4_payment: '#payment-option-1',
		checkout_step4_cgv: '//input[@id="conditions_to_approve[terms-and-conditions]"]',
		checkout_step4_order: '#payment-confirmation >div > button',
		checkout_total: '//div[@class="cart-summary-line cart-total"]/span[2]',
		order_confirmation_name: '#order-items > table:nth-child(2) > tbody > tr > td:nth-child(2)',
		order_confirmation_price1: '#order-items > table:nth-child(4) > tbody > tr.font-weight-bold > td:nth-child(2)',
		order_confirmation_price2: '#content-hook_payment_return > div > div > div > dl > dd:nth-child(2)',
		order_confirmation_ref: '(//div[@id="order-details"]/ul/li)[1]',
		search_product: '.ui-autocomplete-input',
		search_product_button: '.material-icons.search',
		search_product_result_image: '.thumbnail.product-thumbnail',
		search_product_result_name: '.h3.product-title > a',
		search_product_result_price: '[itemprop="price"]',

	},
    shouldExist: function(err, existing) {
        should(err).be.not.defined;
        should(existing).be.true;
    }
};
