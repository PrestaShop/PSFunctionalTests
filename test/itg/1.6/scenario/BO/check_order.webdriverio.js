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
                    .waitForExist(this.selector.BO.AccessPage.login_input, 120000)
                    .setValue(this.selector.BO.AccessPage.login_input, 'demo@prestashop.com')
                    .waitForExist(this.selector.BO.AccessPage.password_input, 120000)
                    .setValue(this.selector.BO.AccessPage.password_input, 'prestashop_demo')
                    .waitForExist(this.selector.BO.AccessPage.login_button, 90000)
                    .click(this.selector.BO.AccessPage.login_button)
                    .waitForExist(this.selector.BO.AddProductPage.menu, 60000)
                    .call(done);
            });
        });


        describe('Check the order', function (done) {
            it('should go to the orders page', function (done) {
                global.fctname = this.test.title;
                this.client
                    .waitForExist(this.selector.BO.AddProductPage.menu, 60000)
                    .click(this.selector.BO.OrderPage.orders_maintab)
                    .waitForExist(this.selector.BO.OrderPage.form, 60000)
                    .call(done);
            });

            it('should go to the order', function (done) {
                global.fctname = this.test.title;
                var my_selector = "//td[contains(@onclick,'&id_order=" + order_id + "&')]";
                this.client
                    .waitForExist(my_selector, 60000)
                    .click(my_selector)
                    .waitForExist(this.selector.BO.OrderPage.product_name_span, 60000)
                    .call(done);
            });

            it('should check the product name', function (done) {
                this.client
                    .getText(this.selector.BO.OrderPage.product_name_span).then(function (text) {
                    var my_order_product_name = text;
                    should(my_order_product_name).be.equal(my_name);
                })
                    .call(done);
            });

            it('should check the product quantity', function (done) {
                global.fctname = this.test.title;
                this.client
                    .getText(this.selector.BO.OrderPage.quantity_span).then(function (text) {
                    var my_order_quantity = text;
                    should(my_order_quantity).be.equal(my_quantity);
                })
                    .call(done);
            });

            it('should check the product total price', function (done) {
                global.fctname = this.test.title;
                this.client
                    .getText(this.selector.BO.OrderPage.total).then(function (text) {
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