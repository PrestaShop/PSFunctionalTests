'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');

describe('The Install of a Module', function(){
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
                .waitForExist(this.selector.menu, 60000)
                .click(this.selector.modules_menu)
                .waitForExist(this.selector.modules_search, 60000)
                .call(done);
        });

        it('should install the module', function(done){
                this.client
                /*.isExisting("//*[@class=\"alert alert-danger\"]").then(function(present) {
                    should(present).be.equal(false);
                })*/
                .setValue(this.selector.modules_search, module_tech_name)
                .waitForExist('//table[@id="module-list"]/tbody/tr[not(@style)]//span[text()="' + module_tech_name+ '"]', 60000)
                .click('//i[@class="icon-plus-sign-alt" and ancestor::tr[not(@style)]//span[text()="' + module_tech_name+ '"]]')
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