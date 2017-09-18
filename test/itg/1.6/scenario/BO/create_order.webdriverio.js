'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');


describe('check the order in BO', function () {
    common.initMocha.call(this);

    before(function (done) {
        this.selector = globals.selector;
        this.client.call(done);
    });
    process.on('uncaughtException', common.take_screenshot);
    process.on('ReferenceError', common.take_screenshot);
    after(common.after);

    it('loggin BO', function (done) {
        global.fctname = this.test.title;
        this.client
            .signinBO()
            .call(done);
    });

    it('go_to_order', function (done) {
        global.fctname = this.test.title;
        this.client
            .waitForExist(this.selector.BO.AddProductPage.menu, 60000)
            .click(this.selector.BO.OrderPage.orders_maintab)
            .waitForExist(this.selector.BO.OrderPage.form, 60000)
            .call(done);
    });


    it('create_order', function (done) {
        global.fctname = this.test.title;
        this.client
            .waitForExist(this.selector.BO.OrderPage.new_order_button, 60000)
            .click(this.selector.BO.OrderPage.new_order_button)
            .waitForExist(this.selector.BO.OrderPage.search_customer_input, 60000)
            .setValue(this.selector.BO.OrderPage.search_customer_input, 'john')
            .waitForExist(this.selector.BO.OrderPage.new_client_choose_button, 60000)
            .click(this.selector.BO.OrderPage.new_client_choose_button)
            .waitForExist(this.selector.BO.OrderPage.search_product_input, 60000)
            .setValue(this.selector.BO.OrderPage.search_product_input, 'dress')
            .waitForExist(this.selector.BO.OrderPage.new_product_name_list, 60000)
            .isExisting(this.selector.BO.OrderPage.new_product_combination_list).then(function (isExisting) {
            global.combination = isExisting;
        })
            .call(done);
    });

    it('save_informations', function (done) {
        global.fctname = this.test.title;
        if (combination == true) {
            this.client.getText(this.selector.BO.OrderPage.new_product_combination_choose).then(function (text) {
                var idx = text.lastIndexOf("-");
                global.product_combination = text.slice(0, idx);
                global.product_price = text.split("-").pop(-1);
            });
            this.client.getText(this.selector.BO.OrderPage.new_product_name_choose).then(function (text) {
                global.product_name = text;
            });
        } else {
            this.client.getText(this.selector.BO.OrderPage.new_product_name_choose).then(function (text) {
                var idx = text.lastIndexOf("-");
                global.product_price = text.split("-").pop(-1);
                global.product_name = text.slice(0, idx);
            });
        }
        this.client.call(done);
    });


    it('check_order', function (done) {
        global.fctname = this.test.title;
        var my_selector = "//td[contains(@onclick,'&id_order=" + order_id + "&')]";
        this.client
            .waitForExist(my_selector, 60000)
            .click(my_selector)
            .waitForExist(this.selector.BO.OrderPage.product_name_span, 60000)
            .getText(this.selector.BO.OrderPage.product_name_span).then(function (text) {
            var my_order_product_name = text;
            should(my_order_product_name).be.equal(my_name);
        })
            .getText(this.selector.BO.OrderPage.quantity_span).then(function (text) {
            var my_order_quantity = text;
            should(my_order_quantity).be.equal(my_quantity);
        })
            .getText(this.selector.BO.OrderPage.total).then(function (text) {
            var my_order_total = text;
            should(my_order_total).be.equal(my_price);
        })
            .call(done);
    });

    it('logout BO', function (done) {
        global.fctname = this.test.title;
        this.client
            .signoutBO()
            .call(done);
    });

});