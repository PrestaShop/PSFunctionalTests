'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');
var green_validation_is_visible = false;


describe('The Install of a Module', function(){
	common.initMocha.call(this);

	before(function(done){
		this.selector = globals.selector;
		this.client.call(done);
	});
	process.on('uncaughtException', common.take_screenshot);
	process.on('ReferenceError', common.take_screenshot);
	after(common.after);


	describe('Log in in Back Office', function(done){
        it('should log in successfully in BO', function(done){
            global.fctname= this.test.title;
			this.client
				.signinBO()
				.waitForExist(this.selector.menu, 90000)
				.call(done);
		});
	});


	describe('Install module', function(done){
        it('sould go to the module', function(done){
            global.fctname= this.test.title;
			this.client
				.click(this.selector.modules_menu)
				.waitForExist(this.selector.modules_page_loaded, 90000)
				.call(done);
		});

		it('should click on install button', function(done){
		    global.fctname= this.test.title;
			this.client
				.setValue(this.selector.modules_search, module_tech_name)
				.click(this.selector.modules_search_button)
				.waitForExist('//div[@data-tech-name="' + module_tech_name + '" and not(@style)]', 90000)
				.click('//div[@data-tech-name="' + module_tech_name + '" and not(@style)]//button[@data-confirm_modal="module-modal-confirm-' + module_tech_name + '-install"]')
				.pause(2000)
				.isVisible(this.selector.red_validation).then(function(isVisible) {
			        global.red_validation_is_visible = isVisible;
				})
				.pause(1000)
                .isVisible(this.selector.green_validation).then(function(isVisible) {
				    green_validation_is_visible = isVisible;
				})
				.call(done);
		});

		it('should check the installation',function(done){
		    global.fctname= this.test.title;
            if (red_validation_is_visible){
                this.client
            	    .getText(this.selector.red_validation).then(function(text) {
                        done(new Error(text));
                    })
            }else if (green_validation_is_visible){
                done();
            }else{
                done();
            }
	    });
	});

	describe('Log out in Back Office', function(done){
        it('should log out successfully in BO', function(done){
            global.fctname= this.test.title;
			this.client
				.signoutBO()
				.call(done);
		});
	});

});	