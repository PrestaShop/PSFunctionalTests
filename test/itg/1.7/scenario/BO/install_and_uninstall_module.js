'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');
var exit_welcome = false;

describe('The Install of a Module and its Uninstall', function(){
	common.initMocha.call(this);
	
	before(function(done){
		this.selector = globals.selector;
		this.client.call(done);
	});
	after(common.after);

	 describe('Log in in Back Office', function(done){
        it('should log in successfully in BO', function(done){
			this.client
				.signinBO()
				.isVisible(this.selector.exit_welcome).then(function(isVisible) {
					exit_welcome = true;
				})
				.waitForExist(this.selector.menu, 90000)
				.call(done);
		});
	  });

	describe('Install module', function(done){
        it('sould go to the module', function(done){
            if (exit_welcome == true){
				    this.client
				    .waitForExist(this.selector.exit_welcome, 90000)
				    .click(this.selector.exit_welcome);
			}
			this.client
			    .pause(5000)
				.click(this.selector.modules_menu)
				.waitForExist(this.selector.modules_page_loaded, 90000)
				.call(done);
		});
		
		it('should install the module', function(done){
			this.client
				.setValue(this.selector.modules_search, module_tech_name)
				.click(this.selector.modules_search_button)
				.waitForExist('//div[@data-tech-name="' + module_tech_name + '" and not(@style)]', 90000)
				.click('//div[@data-tech-name="' + module_tech_name + '" and not(@style)]//a[@data-confirm_modal="module-modal-confirm-' + module_tech_name + '-install"]')
				.waitForExist(this.selector.green_validation, 90000)
				.call(done);
		});
	});
		
	describe('Uninstall module', function(done){
        it('should go to the module', function(done){
			this.client
				.click(this.selector.modules_installed)
				.waitForExist(this.selector.modules_page_loaded, 90000)
				.setValue(this.selector.modules_search, module_tech_name)
				.click(this.selector.modules_search_button)
				.call(done);
		});

		it('should uninstall_module', function(done){
                this.client
				.waitForExist('//div[@data-tech-name="' + module_tech_name + '" and not(@style)]', 90000)
				.click('//div[@data-tech-name="' + module_tech_name + '" and not(@style)]//button[@class="btn btn-primary-outline  dropdown-toggle light-button"]')
				.waitForExist('//div[@data-tech-name="' + module_tech_name + '" and not(@style)]//a[@class="dropdown-item module_action_menu_uninstall"]', 90000)
				.click('//div[@data-tech-name="' + module_tech_name + '" and not(@style)]//a[@class="dropdown-item module_action_menu_uninstall"]')
				.waitForExist('//div[@id="module-modal-confirm-' + module_tech_name + '-uninstall" and @class="modal modal-vcenter fade in"]//a[@class="btn btn-primary uppercase module_action_modal_uninstall"]', 30000)
				.click('//div[@id="module-modal-confirm-' + module_tech_name + '-uninstall" and @class="modal modal-vcenter fade in"]//a[@class="btn btn-primary uppercase module_action_modal_uninstall"]')
				.waitForExist(this.selector.green_validation, 90000)
				.call(done);
		});
	})
		
	describe('Log out in Back Office', function(done){
        it('should log out successfully in BO', function(done){
			this.client
				.signoutBO()
				.call(done);
		});
	});

});