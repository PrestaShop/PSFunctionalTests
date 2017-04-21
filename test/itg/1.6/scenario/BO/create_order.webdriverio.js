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
            .waitForExist(this.selector.menu, 60000)
            .click(this.selector.orders)
            .waitForExist(this.selector.orders_form, 60000)
            .call(done);
    });


    it('create_order', function (done) {
        global.fctname = this.test.title;
        this.client
            .waitForExist(this.selector.new_order, 60000)
            .click(this.selector.new_order)
            .waitForExist(this.selector.new_order_client, 60000)
            .setValue(this.selector.new_order_client, 'john')
            .waitForExist(this.selector.new_order_client_choose, 60000)
            .click(this.selector.new_order_client_choose)
            .waitForExist(this.selector.new_order_product, 60000)
            .setValue(this.selector.new_order_product, 'dress')
            .waitForExist(this.selector.new_order_product_name_list, 60000)
            .isExisting(this.selector.new_order_product_combination_list).then(function (isExisting) {
            global.combination = isExisting;
        })
            .call(done);
    });

    it('save_informations', function (done) {
        global.fctname = this.test.title;
        if (combination == true) {
            this.client.getText(this.selector.new_order_product_combination_1).then(function (text) {
                var idx = text.lastIndexOf("-");
                global.product_combination = text.slice(0, idx);
                global.product_price = text.split("-").pop(-1);
            });
            this.client.getText(this.selector.new_order_product_name_choose).then(function (text) {
                global.product_name = text;
            });
        } else {
            this.client.getText(this.selector.new_order_product_name_choose).then(function (text) {
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
            .waitForExist(this.selector.order_product_name, 60000)
            .getText(this.selector.order_product_name).then(function (text) {
            var my_order_product_name = text;
            should(my_order_product_name).be.equal(my_name);
        })
            .getText(this.selector.order_quantity).then(function (text) {
            var my_order_quantity = text;
            should(my_order_quantity).be.equal(my_quantity);
        })
            .getText(this.selector.order_total).then(function (text) {
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