'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');
var green_validation_is_visible = false;
var install_anyway_is_visible = false;


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


    describe('Install module', function (done) {
        it('sould go to modules page', function (done) {
            global.fctname = this.test.title;
            this.client
                .click(this.selector.modules_menu)
                .waitForExist(this.selector.modules_search, 60000)
                .call(done);
        });

        it('should search the module', function (done) {
            global.fctname = this.test.title;
            this.client
            /*.isExisting("//*[@class=\"alert alert-danger\"]").then(function(present) {
             should(present).be.equal(false);
             })*/
                .setValue(this.selector.modules_search, module_tech_name)
                .waitForExist('//table[@id="module-list"]/tbody/tr[not(@style)]//span[text()="' + module_tech_name + '"]', 60000)
                .call(done);
        });

        it('should click on install button', function (done) {
            global.fctname = this.test.title;
            this.client
                .click('//i[@class="icon-plus-sign-alt" and ancestor::tr[not(@style)]//span[text()="' + module_tech_name + '"]]')
                .pause(2000)
                .isVisible(this.selector.proceed_installation_anyway_button).then(function (isVisible) {
                install_anyway_is_visible = isVisible;
            })
                .call(done);
        });

        it('should click on "proceed install anyway" button if popup appears', function (done) {
            global.fctname = this.test.title;
            if (install_anyway_is_visible) {
                this.client.click(this.selector.proceed_installation_anyway_button);
            }
            this.client
                .pause(2000)
                .isVisible(this.selector.red_validation).then(function (isVisible) {
                global.red_validation_is_visible = isVisible;
            })
                .call(done);
        });

        it('should check the installation', function (done) {
            global.fctname = this.test.title;
            if (red_validation_is_visible) {
                this.client
                    .getText(this.selector.red_validation).then(function (text) {
                    done(new Error(text));
                })
            } else {
                this.client
                    .pause(1000)
                    .isVisible(this.selector.green_validation).then(function (isVisible) {
                    green_validation_is_visible = isVisible;
                    if (green_validation_is_visible) {
                        done();
                    } else {
                        done();
                    }
                })
            }

        });
    });

    describe('Log out in Back Office', function (done) {
        it('should log out successfully in BO', function (done) {
            global.fctname = this.test.title;
            this.client
            //.signoutBO()
                .deleteCookie()
                .call(done);
        });
    });

});	