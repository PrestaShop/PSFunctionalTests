'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');

describe('install_module', function(){
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

		
		it('go_to_module', function(done){
			this.client
				.waitForExist(this.selector.menu, 60000)
				.click(this.selector.modules_menu)
				.waitForExist(this.selector.modules_page_loaded, 60000)
				.call(done);
		});
		
		it('install_module', function(done){			
				this.client
				.setValue(this.selector.modules_search, module_tech_name)
				.click(this.selector.modules_search_button)
				.waitForExist('//div[@data-tech-name="' + module_tech_name + '" and not(@style)]', 60000)
				.click('//div[@data-tech-name="' + module_tech_name + '" and not(@style)]//a[@data-confirm_modal="module-modal-confirm-' + module_tech_name + '-install"]')
				.waitForExist(this.selector.green_validation, 60000)
				.call(done);
		});
		
		it('logout_BO', function(done){
			this.client
				.signoutBO()
				.call(done);
		});

});	