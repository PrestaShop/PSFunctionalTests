'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');

describe('The Check of the order in Back Office', function () {
    common.initMocha.call(this);

    before(function (done) {
        this.selector = globals.selector;
        this.client.call(done);
    });
    process.on('uncaughtException', common.take_screenshot);
    process.on('ReferenceError', common.take_screenshot);
    after(common.after);

    try {
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


        describe('Check the order', function (done) {
            it('should go to the orders page', function (done) {
                global.fctname = this.test.title;
                this.client
                    .waitForExist(this.selector.menu, 60000)
                    .click(this.selector.orders)
                    .waitForExist(this.selector.orders_form, 60000)
                    .call(done);
            });

            it('should go to the order', function (done) {
                global.fctname = this.test.title;
                var my_selector = "//td[contains(@onclick,'&id_order=" + order_id + "&')]";
                this.client
                    .waitForExist(my_selector, 60000)
                    .click(my_selector)
                    .waitForExist(this.selector.order_product_name, 60000)
                    .call(done);
            });

            it('should check the product name', function (done) {
                this.client
                    .getText(this.selector.order_product_name).then(function (text) {
                    var my_order_product_name = text;
                    should(my_order_product_name).be.equal(my_name);
                })
                    .call(done);
            });

            it('should check the product quantity', function (done) {
                global.fctname = this.test.title;
                this.client
                    .getText(this.selector.order_quantity).then(function (text) {
                    var my_order_quantity = text;
                    should(my_order_quantity).be.equal(my_quantity);
                })
                    .call(done);
            });

            it('should check the product total price', function (done) {
                global.fctname = this.test.title;
                this.client
                    .getText(this.selector.order_total).then(function (text) {
                    var my_order_total = text;
                    should(my_order_total).be.equal(my_price);
                })
                    .call(done);
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
    } catch (e) {
    }
    ;
});