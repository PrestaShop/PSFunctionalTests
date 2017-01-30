'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');

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

	describe('Uninstall module', function(done){
        it('should go to modules page', function(done){
            this.client
                .waitForExist(this.selector.menu, 60000)
                .click(this.selector.modules_menu)
                .waitForExist(this.selector.modules_search, 60000)
                .call(done);
        });

        it('should uninstall the module', function(done){
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
        });
    });

    describe('Log out in Back Office', function(done){
        it('should log out successfully in BO', function(done){
            this.client
                //.signoutBO()
                .deleteCookie()
                .call(done);
        });
    });

});	