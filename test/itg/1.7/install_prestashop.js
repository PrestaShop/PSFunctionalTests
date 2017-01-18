'use strict';
var common = require('./common.webdriverio');
var globals = require('./globals.webdriverio.js');

describe('install_prestashop', function(){
	common.initMocha.call(this);
	before(function(done){
		this.selector = globals.selector;
		this.client.call(done);
	});
	after(common.after);

	    it('open install', function(done){
			this.client
				.localhost()
				.waitForExist(this.selector.english, 300000)
				.call(done);
		});

	    it('install', function(done){
			this.client
			.waitForExist(this.selector.english, 300000)
			.click(this.selector.english)
			.selectByIndex(this.selector.english,3)
			.waitForExist(this.selector.next, 300000)
			.click(this.selector.next)
			.waitForExist(this.selector.agree_checkbox, 300000)
			.click(this.selector.agree_checkbox)
			.waitForExist(this.selector.next, 300000)
			.click(this.selector.next)
			.waitForExist(this.selector.next, 300000)
			.click(this.selector.next)
			.waitForExist(this.selector.shop_name, 300000)
			.setValue(this.selector.shop_name, "prestashop_1.7.0.3")
			.click(this.selector.country_fo)
			.click(this.selector.country_france)

			.waitForExist(this.selector.first_name, 300000)
			.setValue(this.selector.first_name, "demo")
			.waitForExist(this.selector.last_name, 300000)
			.setValue(this.selector.last_name, "prestashop")
			.waitForExist(this.selector.email_address, 300000)
			.setValue(this.selector.email_address, "demo@prestashop.com")
			.waitForExist(this.selector.shop_password, 300000)
			.setValue(this.selector.shop_password, "prestashop_demo")
			.waitForExist(this.selector.retype_password, 300000)
			.setValue(this.selector.retype_password, "prestashop_demo")
			.waitForExist(this.selector.next, 300000)
			.click(this.selector.next)

			.waitForExist(this.selector.database_address, 300000)
			.setValue(this.selector.database_address, "mysql")
			.waitForExist(this.selector.database_name, 300000)
			.setValue(this.selector.database_name, "prestashop")
            .waitForExist(this.selector.database_login, 300000)
			.setValue(this.selector.database_login, "root")
			.waitForExist(this.selector.database_password, 300000)
			.setValue(this.selector.database_password, "doge")
			.waitForExist(this.selector.test_conection, 300000)
			.click(this.selector.test_conection)
			.waitForExist(this.selector.next, 300000)
			.click(this.selector.next)

			.waitForVisible(this.selector.create_file_parameter, 300000)
			.waitForVisible(this.selector.create_database, 9000000)
			.waitForVisible(this.selector.create_default_shop, 9000000)
			.waitForVisible(this.selector.create_database_table, 9000000)
			.waitForVisible(this.selector.create_shop_informations, 9000000)
			.waitForVisible(this.selector.create_demonstration_data, 9000000)
			.waitForVisible(this.selector.install_module, 9000000)
			.waitForVisible(this.selector.install_addons_modules, 9000000)
			.waitForVisible(this.selector.install_theme, 9000000)
            .waitForVisible(this.selector.finish, 90000000)
			.call(done);
		});
});