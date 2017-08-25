'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');

describe('The Purchase of a product', function () {
    common.initMocha.call(this);

    before(function (done) {
        this.selector = globals.selector;
        this.client.call(done);
    });
    process.on('uncaughtException', common.take_screenshot);
    process.on('ReferenceError', common.take_screenshot);
    after(common.after);

    it('Open the shop and loggin FO', function (done) {
        global.fctname = this.test.title;
        this.client
            .url('http://' + URL)
            .waitForExist(this.selector.FO.AccessPage.sign_in_button, 90000)
            .click(this.selector.FO.AccessPage.sign_in_button)
            .waitForExist(this.selector.FO.AccessPage.login_input, 90000)
            .setValue(this.selector.FO.AccessPage.login_input, 'pub@prestashop.com')
            .setValue(this.selector.FO.AccessPage.password_input, '123456789')
            .click(this.selector.FO.AccessPage.login_button)
            .call(done);

    });

    describe('Add product to cart', function (done) {
        it('should go to the product details', function (done) {
            global.fctname = this.test.title;
            this.client
                .click(this.selector.FO.AccessPage.logo_home_page)
                .waitForExist(this.selector.FO.BuyOrderPage.first_product_home_page, 90000)
                .getText(this.selector.FO.BuyOrderPage.first_product_home_page_name).then(function (text) {
                global.my_name = text[1].split('...')[0];
            })
                .click(this.selector.FO.BuyOrderPage.first_product_home_page)
                .waitForExist(this.selector.FO.BuyOrderPage.product_image, 90000)
                .getText(this.selector.FO.BuyOrderPage.product_name_details).then(function (text) {
                var my_name_check = text;
                my_name_check.pop(-1).toLowerCase().should.containEql(my_name.toLowerCase());
            })
                .getText(this.selector.FO.BuyOrderPage.product_price_details).then(function (text) {
                global.my_price = text;
            })
                .getValue(this.selector.FO.BuyOrderPage.product_quantity_details).then(function (text) {
                global.my_quantity = text;
            })
                .click(this.selector.FO.BuyOrderPage.add_to_cart_button)
                .waitForExist(this.selector.FO.LayerCartPage.layer_cart, 90000)
                .getText(this.selector.FO.LayerCartPage.name_details).then(function (text) {
                var my_cart_name_check = text;
                my_cart_name_check.toLowerCase().should.containEql(my_name.toLowerCase())
            })
                .getText(this.selector.FO.LayerCartPage.price_details).then(function (text) {
                var my_cart_price_check = text;
                should(my_cart_price_check).be.equal(my_price);
            })
                .getText(this.selector.FO.LayerCartPage.quantity_details).then(function (text) {
                var my_cart_quantity_check = text.split(': ');
                should(my_cart_quantity_check[1]).be.equal(my_quantity);
            })
                .call(done);
        });

        it('should click add to cart button ', function (done) {
            global.fctname = this.test.title;
            this.client
                .click(this.selector.FO.LayerCartPage.command_button)
                .call(done);
        });
    });

    describe('Validate the cart', function () {
        it('should validate name of product', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.FO.BuyOrderPage.proceed_to_checkout_button, 90000)
                .getText(this.selector.FO.BuyOrderPage.product_name).then(function (text) {
                var command_my_name = text;
                command_my_name.toLowerCase().should.containEql(my_name.toLowerCase());
            })
                .call(done);
        });

        it('should validate price of product', function (done) {
            global.fctname = this.test.title;
            this.client
                .getText(this.selector.FO.BuyOrderPage.product_price).then(function (text) {
                var command_price_check = text;
                should(command_price_check).be.equal(my_price);
            })
                .call(done);
        });
        it('should click checkout button', function (done) {
            global.fctname = this.test.title;
            this.client
                .click(this.selector.FO.BuyOrderPage.proceed_to_checkout_button)
                .call(done);
        });

        it('should select the address step-2', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.FO.BuyOrderPage.checkout_step2_continue_button, 90000)
                .click(this.selector.FO.BuyOrderPage.checkout_step2_continue_button)
                .waitForExist(this.selector.FO.BuyOrderPage.checkout_step3_continue_button, 90000)
                .click(this.selector.FO.BuyOrderPage.checkout_step3_continue_button)
                .call(done);
        });

        it('should select the payment step-3', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.FO.BuyOrderPage.checkout_step4_payment_radio, 90000)
                .getText(this.selector.FO.BuyOrderPage.checkout_total).then(function (text) {
                var checkout_total = text;
                should(checkout_total).be.equal(my_price);
            })
                .click(this.selector.FO.BuyOrderPage.checkout_step4_payment_radio)
                .call(done);
        });

        it('should select the shipping method step-4', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.FO.BuyOrderPage.checkout_step4_cgv_checkbox, 90000)
                .click(this.selector.FO.BuyOrderPage.checkout_step4_cgv_checkbox)
                .waitForExist(this.selector.FO.BuyOrderPage.checkout_step4_order_button, 90000)
                .click(this.selector.FO.BuyOrderPage.checkout_step4_order_button)
                .call(done);
        });

        it('should confirm the order', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.FO.BuyOrderPage.order_confirmation_name, 90000)
                .getText(this.selector.FO.BuyOrderPage.order_confirmation_name).then(function (text) {
                var command_confirmation_my_name = text;
                command_confirmation_my_name.toLowerCase().should.containEql(my_name.toLowerCase());
            })
                .waitForExist(this.selector.FO.BuyOrderPage.order_confirmation_price1, 90000)
                .getText(this.selector.FO.BuyOrderPage.order_confirmation_price1).then(function (text) {
                var order_confirmation_price1 = text;
                should(order_confirmation_price1).be.equal(my_price);
            })
                .waitForExist(this.selector.FO.BuyOrderPage.order_confirmation_price2, 90000)
                .getText(this.selector.FO.BuyOrderPage.order_confirmation_price2).then(function (text) {
                var order_confirmation_price2 = text;
                should(order_confirmation_price2).be.equal(my_price);
            })
                .waitForExist(this.selector.FO.BuyOrderPage.order_confirmation_ref, 90000)
                .getText(this.selector.FO.BuyOrderPage.order_confirmation_ref).then(function (text) {
                var my_ref = text.split(': ')
                global.order_reference = my_ref[1];
            })
                .call(done);
        });

        it('should get the order id', function (done) {
            global.fctname = this.test.title;
            this.client
                .url().then(function (res) {
                var current_url = res.value;
                var temp1 = current_url.split("id_order=");
                var temp2 = temp1[1].split("&");
                global.order_id = temp2[0];
            })
                .call(done);
        });
    });

    describe('Log out in Front Office', function (done) {
        it('should logout successfully in FO', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.FO.AccessPage.sign_out_button, 90000)
                .click(this.selector.FO.AccessPage.sign_out_button)
                .waitForExist(this.selector.FO.AccessPage.sign_in_button, 90000)
                .call(done);

        });
    });

});