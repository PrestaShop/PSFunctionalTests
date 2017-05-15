'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');
var exit_welcome = false;
var green_validation_is_visible = false;
var red_validation_is_visible = false;
var modal_confirm_uninstall_is_visible = false;
var uninstall_red_validation_is_visible = false;
var only_filename = __filename.slice(__dirname.length + 1, -3);
global.nbr = -1;


describe('The Install of a Module and its Uninstall', function () {


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
                .isVisible(this.selector.exit_welcome).then(function (isVisible) {
                exit_welcome = isVisible;
            })
                .waitForExist(this.selector.menu, 90000)
                .call(done);
        });
    });

    describe('Install module', function (done) {
        it('should go to modules page', function (done) {
            global.fctname = this.test.title;

            if (exit_welcome) {
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

        it('should go to the module', function (done) {
            global.fctname = this.test.title;

            this.client
                .setValue(this.selector.modules_search, module_tech_name)
                .click(this.selector.modules_search_button)
                .getText(this.selector.nbr_module).then(function (text) {
                global.nbr = parseInt(text[0]);
                if (global.nbr == 0) {
                    done(new Error('The module you are searching for does not exist!'));
                }
                else
                    done();
            })
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
                    red_validation_is_visible = isVisible;
                })
                    .isVisible(this.selector.green_validation).then(function (isVisible) {
                    green_validation_is_visible = isVisible;
                })
                    .call(done);
            }
        });

        it('should check the installation', function (done) {
            global.fctname = this.test.title;
            if (red_validation_is_visible) {
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

    describe('Uninstall module', function (done) {
        it('should go to the module and click on uninstall button', function (done) {
            global.fctname = this.test.title;

            if (global.nbr == 0) {
                done(new Error('The module you are searching for does not exist!'));
            }
            else {
                if (red_validation_is_visible) {
                    done(new Error("Unavailable module"));
                } else {
                    this.client
                        .click(this.selector.modules_installed)
                        .waitForExist(this.selector.modules_page_loaded, 90000)
                        .setValue(this.selector.modules_search, module_tech_name)
                        .click(this.selector.modules_search_button)
                        .waitForExist(this.selector.module_tech_name, 90000)
                        .click(this.selector.uninstall_module_list)
                        .waitForExist(this.selector.uninstall_module_btn, 90000)
                        .click(this.selector.uninstall_module_btn)
                        .pause(2000)
                        .isVisible(this.selector.modal_confirm_uninstall).then(function (isVisible) {
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
            } else {
                if (red_validation_is_visible) {
                    done(new Error("Unavailable module"));
                }
                else {
                    if (modal_confirm_uninstall_is_visible) {
                        this.client
                            .click(this.selector.modal_confirm_uninstall)
                    }
                    this.client
                        .waitForExist(this.selector.close_validation, 90000)
                        .isVisible(this.selector.red_validation).then(function (isVisible) {
                        uninstall_red_validation_is_visible = isVisible;
                    })
                        .isVisible(this.selector.green_validation).then(function (isVisible) {
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
            }
        });
    })

    describe('Log out in Back Office', function (done) {
        it('should log out successfully in BO', function (done) {
            global.fctname = this.test.title;
            this.client
                .signoutBO()
                .call(done);
        });
    });

});