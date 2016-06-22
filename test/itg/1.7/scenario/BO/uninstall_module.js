'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');

describe('uninstall_module', function(){
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
				.waitForExist(this.selector.menu, 30000)
				.click(this.selector.modules_menu)
				.waitForExist(this.selector.modules_page_loaded, 30000)
				.call(done);
		});
		
		it('uninstall_module', function(done){			
				this.client
				.click(this.selector.modules_installed)
				.waitForExist(this.selector.modules_page_loaded, 30000)
				.setValue(this.selector.modules_search, module_tech_name)
				.click(this.selector.modules_search_button)
				.waitForExist('//div[@data-tech-name="' + module_tech_name + '" and not(@style)]', 30000)
				.click('//div[@data-tech-name="' + module_tech_name + '" and not(@style)]//button[@class="btn btn-primary-outline  btn-sm dropdown-toggle light-button"]')
				.waitForExist('//div[@data-tech-name="' + module_tech_name + '" and not(@style)]//a[@class="dropdown-item module_action_menu_uninstall"]', 30000)
				.click('//div[@data-tech-name="' + module_tech_name + '" and not(@style)]//a[@class="dropdown-item module_action_menu_uninstall"]')
				.waitForExist('//div[@id="module-modal-confirm-' + module_tech_name + '-uninstall" and @class="modal modal-vcenter fade in"]//a[@class="btn btn-primary uppercase module_action_modal_uninstall"]', 30000)
				.click('//div[@id="module-modal-confirm-' + module_tech_name + '-uninstall" and @class="modal modal-vcenter fade in"]//a[@class="btn btn-primary uppercase module_action_modal_uninstall"]')
				.waitForExist(this.selector.green_validation, 30000)
				.call(done);
		});
		
				it('logout_BO', function(done){
			this.client
				.signoutBO()
				.call(done);
		});

});	