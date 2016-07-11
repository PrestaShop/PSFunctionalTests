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
				.waitForExist(this.selector.menu, 30000)
				.click(this.selector.modules_menu)
				.waitForExist(this.selector.modules_search, 30000)
				.call(done);
		});
		
		it('install_module', function(done){			
				this.client
				.setValue(this.selector.modules_search, module_tech_name)
				.waitForExist('//table[@id="module-list"]/tbody/tr[not(@style)]//span[text()="' + module_tech_name+ '"]', 30000)
				.click('//i[@class="icon-plus-sign-alt" and ancestor::tr[not(@style)]//span[text()="' + module_tech_name+ '"]]')
				.waitForExist('//div[@class="alert alert-success"]', 30000)
				.call(done);
		});
		
				it('logout_BO', function(done){
			this.client
				.signoutBO()
				.call(done);
		});

});	