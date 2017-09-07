'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');


describe('The Check of the Product in Front Office', function () {
    common.initMocha.call(this);

    before(function (done) {
        this.selector = globals.selector;
        this.client.call(done);
    });
    process.on('uncaughtException', common.take_screenshot);
    process.on('ReferenceError', common.take_screenshot);
    after(common.after);

    describe('Open the shop', function (done) {
        it('should acces to the Front Office', function (done) {
            global.fctname = this.test.title;
            this.client
                .url('http://' + URL)
                .waitForExist(this.selector.FO.AccessPage.logo_home_page, 60000)
                .call(done);
        });
    });

    describe('Check the product', function (done) {
        it('should search for the product', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.FO.SearchProductPage.search_product_input, 60000)
                .click(this.selector.FO.SearchProductPage.search_product_input)
                .setValue(this.selector.FO.SearchProductPage.search_product_input, 'test_nodejs_' + product_id)
                .pause(1000)
                .click(this.selector.FO.SearchProductPage.search_product_button)
                .waitForExist(this.selector.FO.SearchProductPage.search_result_name, 60000)
                .call(done);
        });

        it('should check the product name', function (done) {
            global.fctname = this.test.title;
            this.client
                .getText(this.selector.FO.SearchProductPage.search_result_name).then(function (text) {
                var my_name = text;
                should(my_name[1]).be.equal('test_nodejs_' + product_id);
            })
                .call(done);
        });

        it('should check the product price', function (done) {
            global.fctname = this.test.title;
            this.client
                .getText(this.selector.FO.SearchProductPage.search_result_price).then(function (text) {
                var my_price = text;
                should(parseInt(my_price[1])).be.equal(parseInt("6"));
            })
                .call(done);
        });

        it('should check the product details', function (done) {
            global.fctname = this.test.title;
            this.client
                .moveToObject(this.selector.FO.SearchProductPage.search_result_name)
                .waitForExist(this.selector.FO.SearchProductPage.details, 60000)
                .click(this.selector.FO.SearchProductPage.details)
                .waitForExist(this.selector.FO.ProductDetailsPage.name_details, 60000)
                .getText(this.selector.FO.ProductDetailsPage.name_details).then(function (text) {
                var my_name_check = text;
                should(my_name_check).be.equal('test_nodejs_' + product_id);
            })
                .getAttribute('img[title=' + 'test_nodejs_' + product_id + ']', "alt").then(function (text) {
                var my_src_temp = text[0]
                var my_name_modify = 'test_nodejs_' + product_id;
                my_src_temp.should.be.equal(my_name_modify);
            })
                .getText(this.selector.FO.ProductDetailsPage.price_details).then(function (text) {
                var my_price2 = text;
                should(parseInt(my_price2)).be.equal(parseInt("6"));
            })
                .call(done);
        });
    });
});