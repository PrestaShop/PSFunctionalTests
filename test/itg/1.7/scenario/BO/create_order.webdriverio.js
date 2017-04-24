'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');

describe('Check the order in BO', function () {
    common.initMocha.call(this);

    before(function (done) {
        this.selector = globals.selector;
        this.client.call(done);
    });
    after(common.after);

    try {
        describe('Log in in Back Office', function (done) {
            it('should log in successfully in BO', function (done) {
                global.fctname = this.test.title;
                this.client
                    .signinBO()
                    .waitForExist(this.selector.menu, 90000)
                    .call(done);
            });
        });
        describe('Create order', function (done) {
            it('should go to order', function (done) {
                global.fctname = this.test.title;
                this.client
                    .click(this.selector.orders)
                    .waitForExist(this.selector.orders_form, 90000)
                    .call(done);
            });

            it('should click order id', function (done) {
                global.fctname = this.test.title;
                var my_selector = "//td[contains(@onclick,'&id_order=" + order_id + "&')]";
                this.client
                    .waitForExist(my_selector, 90000)
                    .click(my_selector)
                    .call(done);
            });
            it('should check product name', function (done) {
                global.fctname = this.test.title;
                this.client
                    .waitForExist(this.selector.order_product_name, 90000)
                    .getText(this.selector.order_product_name).then(function (text) {
                    var my_order_product_name = text;
                    my_order_product_name.toLowerCase().should.containEql(my_name.toLowerCase());
                })
                    .call(done);
            });
            it('should check product quantity', function (done) {
                global.fctname = this.test.title;
                this.client
                    .getText(this.selector.order_quantity).then(function (text) {
                    var my_order_quantity = text;
                    should(my_order_quantity).be.equal(my_quantity);
                })
                    .call(done);
            });
            it('should check product price', function (done) {
                global.fctname = this.test.title;
                this.client
                    .getText(this.selector.order_total).then(function (text) {
                    var my_order_total = text;
                    should(my_order_total).be.equal(my_price);
                })
                    .call(done);
            });
            it('should check product reference', function (done) {
                global.fctname = this.test.title;
                this.client
                    .getText(this.selector.order_reference).then(function (text) {
                    var my_order_reference = text;
                    should(my_order_reference).be.equal(order_reference);
                })
                    .pause(5000)
                    .call(done);
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
    } catch (e) {
    }
    ;
});