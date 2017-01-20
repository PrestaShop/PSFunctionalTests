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
				.pause(60000);
			this.client
				.call(done);
		});

		
		it('go_to_module', function(done){
			this.client
				.waitForExist(this.selector.menu, 60000)
				.click(this.selector.modules_menu)
				.waitForExist(this.selector.modules_search, 60000)
				.call(done);
		});
		
		it('uninstall_module', function(done){			
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
		
		it('logout_BO', function(done){
			this.client
				.signoutBO()
				.call(done);
		});

});	