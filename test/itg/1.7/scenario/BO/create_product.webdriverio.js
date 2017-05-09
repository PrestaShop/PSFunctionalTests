'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');
var path = require('path');
var toUpload = path.join(__dirname, '../..', 'datas', 'image_test.jpg');
var devMode = false;
var exit_welcome = false;


describe('The Product Creation', function () {
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

    describe('Create new product', function (done) {
        it("should click on the <add new product> button", function (done) {
            global.fctname = this.test.title;
            if (exit_welcome) {
                this.client
                    .waitForExist(this.selector.exit_welcome, 90000)
                    .click(this.selector.exit_welcome);
            }
            this.client
                .pause(5000)
                .waitForExist(this.selector.menu, 90000)
                .click(this.selector.products)
                .waitForExist(this.selector.new_product, 90000)
                .waitForExist('#notifications-total', 90000)
                .isVisible('//div[@id="debug-mode"]').then(function (isVisible) {
                devMode = isVisible;
            })
                .call(done);
        });

        it('should choose dev mode', function (done) {
            global.fctname = this.test.title;
            if (devMode) {
                this.client
                    .waitForExist('//a[@class="hide-button"]', 90000)
                    .click('//a[@class="hide-button"]');
            }
            this.client.call(done);
        });

        it('should enter the name of product', function (done) {
            global.fctname = this.test.title;
            this.client
                .click(this.selector.new_product)
                .waitForExist(this.selector.product_name, 90000)
                .setValue(this.selector.product_name, 'test_nodejs_' + product_id)
                .call(done);
        });

        it('should enter the quantity of product', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.quantity_shortcut, 90000)
                .clearElement(this.selector.quantity_shortcut)
                .addValue(this.selector.quantity_shortcut, "10")
                .call(done);
        });

        it('should enter the price of product', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.priceTE_shortcut, 90000)
                .execute(function () {
                    document.querySelector('#form_step1_price_shortcut').value = "";
                })
                .setValue(this.selector.priceTE_shortcut, "5")
                .call(done);
        });

        it('should upload the picture of product', function (done) {
            global.fctname = this.test.title;
            this.client
                .execute(function () {
                    document.getElementsByClassName("dz-hidden-input").style = "";
                })
                .chooseFile(this.selector.picture, toUpload)
                .waitForExist(this.selector.picture_cover, 90000)
                .getAttribute('.dz-preview.dz-image-preview.ui-sortable-handle.dz-complete', "data-id").then(function (text) {
                global.image_data_id = text;
            })
                .pause(2000)
                .call(done);
        });

        it('should enter the summary of product', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist('textarea#form_step1_description_short_1', 90000)
                .execute(function () {
                    document.querySelector('textarea#form_step1_description_short_1').style = "";
                })
                .setValue('textarea#form_step1_description_short_1', "this the summary")
                .call(done);
        });

        it('should enter the description of product', function (done) {
            global.fctname = this.test.title;
            this.client
                .click(this.selector.description_button)
                .waitForExist('textarea#form_step1_description_1', 90000)
                .execute(function () {
                    document.querySelector('textarea#form_step1_description_1').style = "";
                })
                .setValue('textarea#form_step1_description_1', "this the description")
                .call(done);
        });

        it('should close toolbar', function (done) {
            global.fctname = this.test.title;
            if (devMode) {
                this.client
                    .waitForExist('//a[@class="hide-button"]', 90000)
                    .click('//a[@class="hide-button"]');
            }
            this.client.call(done);
        });

        it('should select product online', function (done) {
            global.fctname = this.test.title;
            this.client
                .pause(1000)
                .click(this.selector.product_online)
                .call(done);
        });

        it('should save product', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.save_product, 90000)
                .click(this.selector.save_product)
                .call(done);
        });
        it('should close green validation', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.close_validation, 90000)
                .click(this.selector.close_validation)
                .call(done);
        });
    });
    describe('Check the product in the catalog', function (done) {
        it('should go to the catalog', function (done) {
            global.fctname = this.test.title;
            this.client
                .pause(5000)
                .waitForExist(this.selector.more_option, 90000)
                .click(this.selector.more_option)
                .waitForExist(this.selector.go_to_catalog, 90000)
                .click(this.selector.go_to_catalog)
                .call(done);
        });

        it('should search the product by name', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.catalogue_filter_by_name, 90000)
                .setValue(this.selector.catalogue_filter_by_name, 'test_nodejs_' + product_id)
                .click(this.selector.click_outside)
                .pause(2000)
                .click(this.selector.catalogue_submit_filter)
                .call(done);
        });

        it('should select the product name', function (done) {
            global.fctname = this.test.title;
            this.client
                .pause(1000)
                .waitForExist('//a[text()="test_nodejs_' + product_id + '"]', 90000)
                .click('//a[text()="test_nodejs_' + product_id + '"]')
                .waitForExist(this.selector.product_name, 90000)
                .call(done);
        });

        it('Should generate picture url', function (done) {
            global.fctname = this.test.title;
            global.picture_url = "/img/p";
            for (var i = 0, len = image_data_id.length; i < len; i++) {
                picture_url = picture_url + "/" + image_data_id[i];
            }
            picture_url = picture_url + "/" + image_data_id + "-home_default.jpg";
            this.client.call(done);
        });
    });

    describe('Check the product in Back Office', function (done) {
        it('should check the product name', function (done) {
            global.fctname = this.test.title;
            this.client
                .getValue(this.selector.product_name).then(function (text) {
                var my_name = text;
                should(my_name).be.equal('test_nodejs_' + product_id);
            })
                .call(done);
        });

        it('should check the product summary', function (done) {
            global.fctname = this.test.title;
            this.client
                .execute(function () {
                    document.querySelector('textarea#form_step1_description_short_1').style = "";
                })
                .getText('textarea#form_step1_description_short_1').then(function (text) {
                var my_summary = text;
                should(my_summary).be.equal("this the summary");
            })
                .call(done);
        });

        it('should check the product description', function (done) {
            global.fctname = this.test.title;
            this.client
                .click(this.selector.description_button)
                .execute(function () {
                    document.querySelector('textarea#form_step1_description_1').style = "";
                })
                .getText('textarea#form_step1_description_1').then(function (text) {
                var my_description = text;
                should(my_description).be.equal("this the description");
            })
                .call(done);
        });

        it('should check the product price', function (done) {
            global.fctname = this.test.title;
            this.client
                .getValue(this.selector.priceTE_shortcut).then(function (text) {
                var my_priceTE = text;
                should(parseInt(my_priceTE)).be.equal(parseInt("5"));
            })
                .call(done);
        });

        it('should check the product quantity', function (done) {
            global.fctname = this.test.title;
            this.client
                .getValue(this.selector.quantity_shortcut).then(function (text) {
                var my_quantity = text;
                should(parseInt(my_quantity)).be.equal(parseInt("10"));
            })
                .call(done);
        });

        it('should check the product image', function (done) {
            global.fctname = this.test.title;
            this.client
                .getAttribute('div[data-id="' + image_data_id + '"] > div ', "style").then(function (text) {
                var my_picture_url_temp = text[0].split("url(\"");
                var my_picture_url = my_picture_url_temp[1].split("\")");
                var my_final_picture_url = my_picture_url[0].split("img/");
                var final_picture_url = picture_url.split("img/");
                should(my_final_picture_url[1]).be.equal(final_picture_url[1]);
            })
                .call(done);
        });
    });


    describe('Log out in Back Office', function (done) {
        it('should log out successfully in BO', function (done) {
            global.fctname = this.test.title;
            this.client
                .signoutBO2()
                .call(done);
        });
    });
});