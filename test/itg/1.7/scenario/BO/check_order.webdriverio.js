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

    describe('Log in in Back Office', function (done) {
        it('should log in successfully in BO', function (done) {
            global.fctname = this.test.title;
            this.client
                .signinBO()
                .waitForExist(this.selector.BO.AddProductPage.menu, 90000)
                .call(done);
        });
    });

    describe('Check the order', function (done) {
        it('should go to the orders page', function (done) {
            global.fctname = this.test.title;
            this.client
                .click(this.selector.BO.OrderPage.orders_subtab)
                .waitForExist(this.selector.BO.OrderPage.form, 90000)
                .call(done);
        });

        it('should check the order id', function (done) {
            global.fctname = this.test.title;
            this.client
            var my_selector = "//td[contains(@onclick,'&id_order=" + order_id + "&')]";
            this.client
                .waitForExist(my_selector, 90000)
                .click(my_selector)
                //.click(this.selector.close_error)
                .pause(5000)
                .call(done);
        });


        it('should check the order reference', function (done) {
            global.fctname = this.test.title;
            this.client
                .getText(this.selector.BO.OrderPage.order_reference_span).then(function (text) {
                var my_order_reference = text;
                should(my_order_reference).be.equal(order_reference);
            })
                .call(done);
        });

        it('should check the product name', function (done) {
            global.fctname = this.test.title;
            this.client
                .scroll(this.selector.BO.OrderPage.order_product_name_span, 20, 0)
                .waitForExist(this.selector.BO.OrderPage.order_product_name_span, 90000)
                .getText(this.selector.BO.OrderPage.order_product_name_span).then(function (text) {
                var my_order_product_name = text;
                my_order_product_name.toLowerCase().should.containEql(my_name.toLowerCase());
            })
                .call(done);
        });

        it('should check the product quantity', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.OrderPage.order_product_quantity_span, 90000)
                .getText(this.selector.BO.OrderPage.order_product_quantity_span).then(function (text) {
                var my_order_quantity = text;
                should(my_order_quantity).be.equal(my_quantity);
            })
                .call(done);
        });

        it('should check the order total', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.OrderPage.order_product_total, 90000)
                .getText(this.selector.BO.OrderPage.order_product_total).then(function (text) {
                var my_order_total = text;
                should(my_order_total).be.equal(my_price);
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
});
