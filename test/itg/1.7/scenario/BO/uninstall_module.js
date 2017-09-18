'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');
var modal_confirm_uninstall_is_visible = false;
var uninstall_red_validation_is_visible = false;
var green_validation_is_visible = false;

describe('The Uninstall of a Module', function () {
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
                .waitForExist(this.selector.BO.AddProductPage.menu, 90000)
                .call(done);
        });
    });


    describe('Uninstall module', function (done) {
        it('should go to modules page', function (done) {
            global.fctname = this.test.title;
            this.client
                .click(this.selector.BO.ModulePage.modules_subtab)
                .waitForExist(this.selector.BO.ModulePage.installed_modules_tabs)
                .click(this.selector.BO.ModulePage.installed_modules_tabs)
                .waitForExist(this.selector.BO.ModulePage.page_loaded, 90000)
                .call(done);
        });

        it('should go to the module', function (done) {
            global.fctname = this.test.title;
            if (global.nbr == 0) {
                done(new Error('The module you are searching for does not exist!'));
            }
            else {
                if (red_validation_is_visible) {
                    done(new Error("Unavailable module"));
                } else {
                    this.client
                        .setValue(this.selector.BO.ModulePage.search_input, module_tech_name)
                        .click(this.selector.BO.ModulePage.search_button)
                        .waitForExist(this.selector.BO.ModulePage.module_tech_name, 90000)
                        .call(done);
                }
            }
        });

        it('should click on uninstall button', function (done) {
            global.fctname = this.test.title;
            if (global.nbr == 0) {
                done(new Error('The module you are searching for does not exist!'));
            }
            else {
                if (red_validation_is_visible) {
                    done(new Error("Unavailable module"));
                } else {
                    this.client
                        .waitForExist(this.selector.BO.ModulePage.module_tech_name, 90000)
                        .click(this.selector.BO.ModulePage.uninstall_module_list)
                        .waitForExist(this.selector.BO.ModulePage.uninstall_module_btn, 90000)
                        .click(this.selector.BO.ModulePage.uninstall_module_btn)
                        .pause(2000)
                        .isVisible(this.selector.BO.ModulePage.modal_confirm_uninstall).then(function (isVisible) {
                        modal_confirm_uninstall_is_visible = isVisible;
                    })
                        .call(done);
                }
            }
        });

        it('should check modal confirm uninstall', function (done) {
            global.fctname = this.test.title;
            if (global.nbr == 0) {
                done(new Error('The module you are searching for does not exist!'));
            }
            else {
                if (red_validation_is_visible) {
                    done(new Error("Unavailable module"));
                } else {
                    if (modal_confirm_uninstall_is_visible) {
                        this.client
                            .click(this.selector.BO.ModulePage.modal_confirm_uninstall)
                    }
                    this.client
                        .waitForExist(this.selector.BO.AddProductPage.close_validation_button, 90000)
                        .isVisible(this.selector.BO.AddProductPage.red_validation_notice).then(function (isVisible) {
                        uninstall_red_validation_is_visible = isVisible;
                    })
                        .isVisible(this.selector.BO.AddProductPage.green_validation_notice).then(function (isVisible) {
                        green_validation_is_visible = isVisible;
                    })
                        .call(done);
                }
            }
        });

        it('should validate the uninstall', function (done) {
            global.fctname = this.test.title;
            if (red_validation_is_visible) {
                done(new Error("Unavailable module"));
            } else {
                if (uninstall_red_validation_is_visible) {
                    this.client
                        .getText(this.selector.BO.AddProductPage.validation_msg).then(function (text) {
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