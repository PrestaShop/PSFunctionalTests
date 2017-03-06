'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');
var green_validation_is_visible = false;
var red_validation_is_visible = false;
var install_anyway_popup_is_visible = false ;

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
                //.signinBO()
                .url('http://' + URL + '/admin-dev')
                .waitForExist(this.selector.login, 120000)
                .setValue(this.selector.login, 'demo@prestashop.com')
                .waitForExist(this.selector.password, 120000)
                .setValue(this.selector.password, 'prestashop_demo')
                .waitForExist(this.selector.login_btn, 90000)
                .click(this.selector.login_btn)
                .waitForExist(this.selector.menu, 60000)
                .call(done);
        });
    });

    describe('Install module', function(done){
        it('sould go to modules page', function(done){
            this.client
                .click(this.selector.modules_menu)
                .waitForExist(this.selector.modules_search, 60000)
                .call(done);
        });

        it('should search for the module', function(done){
            this.client
                /*.isExisting("//*[@class=\"alert alert-danger\"]").then(function(present) {
                    should(present).be.equal(false);
                })*/
                .setValue(this.selector.modules_search, module_tech_name)
                .waitForExist('//table[@id="module-list"]/tbody/tr[not(@style)]//span[text()="' + module_tech_name+ '"]', 60000)
                .call(done);
        });

        it('should click on install button',function(done){
            this.client
                .click('//i[@class="icon-plus-sign-alt" and ancestor::tr[not(@style)]//span[text()="' + module_tech_name+ '"]]')
                .pause(2000)
				.isVisible('//div[@id="moduleNotTrusted"]//a[@id="proceed-install-anyway"]').then(function(isVisible){
                    install_anyway_popup_is_visible = isVisible;
				})
				.call(done);
		});

		it('should check the installation',function(done){
		    if (install_anyway_popup_is_visible == true){
		        this.client.click('//div[@id="moduleNotTrusted"]//a[@id="proceed-install-anyway"]');
			}
			this.client
				.pause(2000)
                .isVisible('//div[@class="alert alert-danger"]').then(function(isVisible) {
                    red_validation_is_visible = isVisible;
                })
                .pause(1000)
                .isVisible('//div[@class="alert alert-success"]').then(function(isVisible) {
                    green_validation_is_visible = isVisible;
                    if (red_validation_is_visible == true){
                        done(new Error("There is a red popup"));
                    }else if (green_validation_is_visible == true){
                        done();
                    }else{
                        done();
                    }
                })
        });

    });

    describe('Uninstall module', function(done){
        it('should go to modules page', function(done){
            this.client
                .waitForExist(this.selector.menu, 60000)
                .click(this.selector.modules_menu)
                .waitForExist(this.selector.modules_search, 60000)
                .call(done);
        });

        it('should uninstall the module', function(done){
             if (red_validation_is_visible == true){
		        done(new Error("Unavailable module"));
		     }else {
		        this.client
                /*.isExisting("//*[@class=\"alert alert-danger\"]").then(function(present) {
                    should(present).be.equal(false);
                })*/
                .setValue(this.selector.modules_search, module_tech_name)
                .waitForExist('//table[@id="module-list"]/tbody/tr[not(@style)]//span[text()="' + module_tech_name+ '"]', 60000)
                .click('//button[@class="btn btn-default dropdown-toggle" and ancestor::tr[not(@style)]//span[text()="' + module_tech_name+ '"]]')
                .waitForExist('//ul[@class="dropdown-menu" and ancestor::tr[not(@style)]//span[text()="' + module_tech_name+ '"]]/li/a[@title="Uninstall"]', 60000)
                .click('//ul[@class="dropdown-menu" and ancestor::tr[not(@style)]//span[text()="' + module_tech_name+ '"]]/li/a[@title="Uninstall"]')
                .alertAccept()
                .waitForExist('//div[@class="alert alert-success"]', 60000)
                .call(done);
		     }
        });
    });

    describe('Log out in Back Office', function(done){
        it('should log out successfully in BO', function(done){
            this.client
               // .signoutBO()
                .deleteCookie()
                .call(done);
        });
    });

});	