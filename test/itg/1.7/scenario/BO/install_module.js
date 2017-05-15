'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');
var green_validation_is_visible = false;
global.red_validation_is_visible = false;


describe('The Install of a Module', function () {
    common.initMocha.call(this);

    before(function (done) {
        this.selector = globals.selector;
        this.client.call(done);
    });
    process.on('uncaughtException', common.take_screenshot);
    process.on('ReferenceError', common.take_screenshot);
    after(common.after);


    describe('Log in in Back Office', function (done) {
        it('should log in successfully in BO', function (done) {
            global.fctname = this.test.title;
            this.client
                .signinBO()
                .waitForExist(this.selector.menu, 90000)
                .call(done);
        });
    });


    describe('Install module', function (done) {
        it('should go to modules page', function (done) {
            global.fctname = this.test.title;
            this.client
                .pause(5000)
                .click(this.selector.modules_menu)
                .waitForExist(this.selector.modules_page_loaded, 90000)
                .call(done);
        });

        it('should go to the module', function (done) {
            global.fctname = this.test.title;
            if (global.nbr == 0) {
                done(new Error('The module you are searching for does not exist!'));
            }
            else {
                this.client
                    .setValue(this.selector.modules_search, module_tech_name)
                    .click(this.selector.modules_search_button)
                    .call(done);
            }
        });

        it('should click on install button', function (done) {
            global.fctname = this.test.title;
            if (global.nbr == 0) {
                done(new Error('The module you are searching for does not exist!'));
            }
            else {
                this.client
                    .waitForExist(this.selector.module_tech_name, 90000)
                    .click(this.selector.install_module_btn)
                    .waitForExist(this.selector.close_validation, 90000)
                    .isVisible(this.selector.red_validation).then(function (isVisible) {
                    global.red_validation_is_visible = isVisible;
                })
                    .isVisible(this.selector.green_validation).then(function (isVisible) {
                    green_validation_is_visible = isVisible;
                })
                    .call(done);
            }
        });

        it('should check the installation', function (done) {
            global.fctname = this.test.title;
            if (global.red_validation_is_visible) {
                this.client
                    .getText(this.selector.validation_msg).then(function (text) {
                    done(new Error(text));
                })
            } else if (green_validation_is_visible) {
                done();
            } else {
                if (global.nbr == 0) {
                    done(new Error('The module you are searching for does not exist!'));
                } else {
                    done(new Error('There is no install validation alert!'));
                }
            }
        });
    });

    describe('Log out in Back Office', function (done) {
        it('should log out successfully in BO', function (done) {
            global.fctname = this.test.title;
            this.client
                .signoutBO()
                .call(done);
        });
    });

});	