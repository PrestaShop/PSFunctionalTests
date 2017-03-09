'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');
var modal_confirm_uninstall_is_visible = false;

describe('The Uninstall of a Module', function(){
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
				.waitForExist(this.selector.menu, 90000)
				.call(done);
		});
	});

		
	describe('Uninstall module', function(done){
        it('should go to the module', function(done){
			this.client
			    .click(this.selector.modules_menu)
			    .waitForExist(this.selector.modules_installed)
				.click(this.selector.modules_installed)
				.waitForExist(this.selector.modules_page_loaded, 90000)
				.setValue(this.selector.modules_search, module_tech_name)
				.click(this.selector.modules_search_button)
				.call(done);
		});
		
		it('should click on uninstall button', function(done){
		    if (red_validation_is_visible){
		        done(new Error("Unavailable module"));
		    }else{
		        this.client
		            .waitForExist('//div[@data-tech-name="' + module_tech_name + '" and not(@style)]', 90000)
                    .click('//div[@data-tech-name="' + module_tech_name + '" and not(@style)]//button[@class="btn btn-primary-outline  dropdown-toggle light-button"]')
                    .waitForExist('//div[@data-tech-name="' + module_tech_name + '" and not(@style)]//button[@class="dropdown-item module_action_menu_uninstall"]', 90000)
                    .click('//div[@data-tech-name="' + module_tech_name + '" and not(@style)]//button[@class="dropdown-item module_action_menu_uninstall"]')
                    .isVisible('//div[@id="module-modal-confirm-' + module_tech_name + '-uninstall" and @class="modal modal-vcenter fade in"]//a[@class="btn btn-primary uppercase module_action_modal_uninstall"]').then(function(isVisible) {
				    	modal_confirm_uninstall_is_visible = isVisible;
				    })
                    .call(done);
		    }
		});

		it('should check the uninstall', function(done){
		    if (red_validation_is_visible){
		        done(new Error("Unavailable module"));
		    }else{
                if (modal_confirm_uninstall_is_visible){
                    this.client
                        .click('//div[@id="module-modal-confirm-' + module_tech_name + '-uninstall" and @class="modal modal-vcenter fade in"]//a[@class="btn btn-primary uppercase module_action_modal_uninstall"]');
                }

                this.client
                    .waitForExist(this.selector.green_validation, 90000)
                    .call(done);
            }
		});
	});
		
	describe('Log out in Back Office', function(done){
        it('should log out successfully in BO', function(done){
			this.client
				.signoutBO()
				.call(done);
		});
	});
});	