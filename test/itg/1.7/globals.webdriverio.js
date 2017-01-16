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
	//Installation
	    english:'//*[@id="langList"]',
	    next:'//*[@id="btNext"]',
	    agree_checkbox:'//*[@id="set_license"]',
        shop_name:'//*[@id="infosShop"]',
        first_name:'//*[@id="infosFirstname"]',
        last_name:'//*[@id="infosName"]',
        email_address:'//*[@id="infosEmail"]',
        shop_password:'//*[@id="infosPassword"]',
        retype_password:'//*[@id="infosPasswordRepeat"]',
        database_address:'//*[@id="dbServer"]',
        database_name:'//*[@id="dbName"]',
        database_login:'//*[@id="dbLogin"]',
        database_password:'//*[@id="dbPassword"]',
        database_server_address:'//*[@id="dbServer"]',
        test_conection:'#btTestDB',

        create_file_parameter:'//*[@id="process_step_generateSettingsFile"]',
        create_database:'//*[@id="process_step_installDatabase"]',
        create_default_shop:'//*[@id="process_step_installDefaultData"]',
        create_database_table:'//*[@id="process_step_populateDatabase"]',
        create_shop_informations:'//*[@id="process_step_configureShop"]',
        create_demonstration_data:'//*[@id="process_step_installFixtures"]',
        install_module:'//*[@id="process_step_installModules"]',
        install_addons_modules:'//*[@id="process_step_installModulesAddons"]',
        install_theme:'//*[@id="process_step_installTheme"]',




	 //BO
		login: '#email',
		password: '#passwd',
		login_btn: '[name="submitLogin"]',
		exit_welcome:'/html/body/div[1]/div/div/i',
		clic:'//*[@id="product_catalog_list"]/div[2]/div/table/thead/tr[1]/th[3]',
		profil: '#employee_infos',
		new_profil: '.employee-dropdown.dropdown > div',
		logout: '#header_logout',
		products: '#subtab-AdminCatalog',
		go_to_catalog: '//*[@id="form"]/div[4]/div[2]/div/div[2]/a[2]',
		more_option:'//*[@id="dropdownMenu"]',


		new_product: '#page-header-desc-configuration-add',
		menu: '#nav-sidebar',
		product_name: '#form_step1_name_1',
		save_product: '//*[@id="form"]/div[4]/div[2]/div/button[1]',
		catalog_list: '#product_catalog_list',
		green_validation: '.growl.growl-notice.growl-medium',
		close_green_validation: '.growl-close',
		summary_button: '[href="#description_short"]',
		summary: 'form_step1_description_short_1_ifr', //not declare than an id because using into function "frame" that not need this information;
		description_button: '[href="#description"]',
		description: 'form_step1_description_1_ifr',//not declare than an id because using into function "frame" that not need this information;
		priceTE_shortcut: '#form_step1_price_shortcut',
		quantity_shortcut: '#form_step1_qty_0_shortcut',
		picture: '[class="dz-hidden-input"]',
		picture_cover: '.iscover',
		product_online: '.switch-input ',
		catalogue_filter_by_name: '//input[@name="filter_column_name"]',
		catalogue_submit_filter: '//button[@name="products_filter_submit"]',
		catalogue_filter_reset: '//button[@type="reset" and @style="display: inline-block;"]',
		orders: '#subtab-AdminParentOrders',
		orders_form: '#form-order',
		order_product_name: '.productName',
		order_quantity: '.product_quantity_show',
		order_total: '#total_order > td.amount.text-right.nowrap',
		//order_reference: '#content > div.row > div > div:nth-child(5) > div.col-lg-7 > div:nth-child(1) > div.panel-heading > span:nth-child(2)',
		order_reference: '((//div[@class="panel-heading"])[1]/span)[1]',
		modules_menu: '#subtab-AdminParentModulesSf',
		modules_search: '.pstaggerAddTagInput.module-tags-input',
		modules_search_button: '.input-group-addon.module-search-icon',
		modules_page_loaded: '.module-search-result-wording',
		modules_installed: '(//div[@class="page-head-tabs"]/a)[2]',
		modules_validate_uninstall: '//a[@class="btn btn-primary uppercase module_action_modal_uninstall"]',
		close_sf_toolbar:'//a[@class="hide-button"]',
		finish:'//*[@id="install_process_success"]/div[1]/h2',
		
	//FO
		access_loginFO:'div.user-info > a',
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
		address: '//*[@id="id-address-delivery-address-1"]/header/label/div',
        radio:"//*[@id="id-address-delivery-address-1"]/header/label/span[1]/input",
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
		//command_product_quantity: '//div[@class="product-line-grid-body col-md-5 col-xs-5"]/div[5]',
		command_product_name: '(//div[@class="product-line-info"])[1]/a',
		command_product_price: '(//div[@class="product-line-info"])[2]/span',

		command_button_checkout: '//*[@id="main"]/div/div[2]/div[1]/div[2]/div/a',


		check_out_step1: '#checkout-personal-information-step',
		check_out_step2: '#checkout-addresses-step',
        edit:'//*[@id="id-address-delivery-address-8"]/footer/a[1]',
		address_lastname:'//*[@id="delivery-address"]/div/section/div[1]/div[1]/input',
		address_firstname:'//*[@id="delivery-address"]/div/section/div[2]/div[1]/input',
		address_delivery:'//*[@id="delivery-address"]/div/section/div[5]/div[1]/input',
		post_code:'//*[@id="delivery-address"]/div/section/div[7]/div[1]/input',
		city:'//*[@id="delivery-address"]/div/section/div[8]/div[1]/input',
		country:'//*[@id="delivery-address"]/div/section/div[9]/div[1]/select',
		checkbox:'//*[@id="delivery-address"]/div/section/div[11]/div/input',

        address_title:'//*[@id="checkout-addresses-step"]',
        checkout_step2_continue_button:'//*[@id="checkout-addresses-step"]/div/div/form/div[2]/button',


		check_out_step3: '#checkout-delivery-step',
		clic_title:'//*[@id="checkout-delivery-step"]',
		clic_title_paiement:'//*[@id="checkout-payment-step"]',
		checkout_step3_continue_button: '//*[@id="js-delivery"]/button',
		//*[@id="js-delivery"]/button
		check_out_step4: '#checkout-payment-step',
		checkout_step4_payment: '//*[@id="payment-option-2"]',
		checkout_step4_cgv: '//input[@id="conditions_to_approve[terms-and-conditions]"]',
		checkout_step4_order: '#payment-confirmation >div > button',
		checkout_total: '//div[@class="cart-summary-line cart-total"]/span[2]',
		//order_confirmation_name: '#order-items > table:nth-child(2) > tbody > tr > td:nth-child(2)',
		order_confirmation_name: '(//div[@class="order-confirmation-table"]/div)/div[2]/span',
		//order_confirmation_price1: '#order-items > table:nth-child(4) > tbody > tr.font-weight-bold > td:nth-child(2)',
		order_confirmation_price1: '((//div[@class="order-confirmation-table"]/table)[2]//td)[2]',
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
