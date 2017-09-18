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
                .waitForExist(this.selector.BO.AddProductPage.menu, 90000)
                .call(done);
        });
    });

    describe('Module "Welcome"', function (done) {
        it("should close the onboarding if displayed", function (done) {
            global.fctname = this.test.title;
            if (this.client.isVisible(this.selector.BO.Onboarding.popup)) {
                this.client
                    .click(this.selector.BO.Onboarding.popup_close_button)
                    .pause(1000)
                    .click(this.selector.BO.Onboarding.stop_button);
            };
            this.client.call(done);
        });
    });

    describe('Create new product', function (done) {
        it("should click on the <add new product> button", function (done) {
            global.fctname = this.test.title;
            this.client
                .pause(5000)
                .waitForExist(this.selector.BO.AddProductPage.menu, 90000)
                .click(this.selector.BO.AddProductPage.products_subtab)
                .waitForExist(this.selector.BO.AddProductPage.new_product_button, 90000)
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
                .click(this.selector.BO.AddProductPage.new_product_button)
                .waitForExist(this.selector.BO.AddProductPage.product_name_input, 90000)
                .setValue(this.selector.BO.AddProductPage.product_name_input, 'test_nodejs_' + product_id)
                .call(done);
        });

        it('should enter the quantity of product', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.AddProductPage.quantity_shortcut_input, 90000)
                .clearElement(this.selector.BO.AddProductPage.quantity_shortcut_input)
                .addValue(this.selector.BO.AddProductPage.quantity_shortcut_input, "10")
                .call(done);
        });

        it('should enter the price of product', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.AddProductPage.price_te_shortcut_input, 90000)
                .execute(function () {
                    document.querySelector('#form_step1_price_shortcut').value = "";
                })
                .setValue(this.selector.BO.AddProductPage.price_te_shortcut_input, "5")
                .call(done);
        });

        it('should upload the picture of product', function (done) {
            global.fctname = this.test.title;
            this.client
                .execute(function () {
                    document.getElementsByClassName("dz-hidden-input").style = "";
                })
                .chooseFile(this.selector.BO.AddProductPage.picture, toUpload)
                .waitForExist(this.selector.BO.AddProductPage.picture_cover, 90000)
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
                .click(this.selector.BO.AddProductPage.description_tab)
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
                .click(this.selector.BO.AddProductPage.product_online_toggle)
                .call(done);
        });

        it('should save product', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.AddProductPage.save_product_button, 90000)
                .click(this.selector.BO.AddProductPage.save_product_button)
                .call(done);
        });
        it('should close green validation', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.AddProductPage.close_validation_button, 90000)
                .click(this.selector.BO.AddProductPage.close_validation_button)
                .call(done);
        });
    });
    describe('Check the product in the catalog', function (done) {
        it('should go to the catalog', function (done) {
            global.fctname = this.test.title;
            this.client
                .pause(5000)
                .waitForExist(this.selector.BO.AddProductPage.more_option_button, 90000)
                .click(this.selector.BO.AddProductPage.more_option_button)
                .waitForExist(this.selector.BO.AddProductPage.go_to_catalog_button, 90000)
                .click(this.selector.BO.AddProductPage.go_to_catalog_button)
                .call(done);
        });

        it('should search the product by name', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.AddProductPage.catalogue_filter_by_name_input, 90000)
                .setValue(this.selector.BO.AddProductPage.catalogue_filter_by_name_input, 'test_nodejs_' + product_id)
                .click(this.selector.BO.AddProductPage.click_outside)
                .pause(2000)
                .click(this.selector.BO.AddProductPage.catalogue_submit_filter_button)
                .call(done);
        });

        it('should select the product name', function (done) {
            global.fctname = this.test.title;
            this.client
                .pause(1000)
                .waitForExist('//a[text()="test_nodejs_' + product_id + '"]', 90000)
                .click('//a[text()="test_nodejs_' + product_id + '"]')
                .waitForExist(this.selector.BO.AddProductPage.product_name_input, 90000)
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
                .getValue(this.selector.BO.AddProductPage.product_name_input).then(function (text) {
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
                .click(this.selector.BO.AddProductPage.description_tab)
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
                .getValue(this.selector.BO.AddProductPage.price_te_shortcut_input).then(function (text) {
                var my_priceTE = text;
                should(parseInt(my_priceTE)).be.equal(parseInt("5"));
            })
                .call(done);
        });

        it('should check the product quantity', function (done) {
            global.fctname = this.test.title;
            this.client
                .getValue(this.selector.BO.AddProductPage.quantity_shortcut_input).then(function (text) {
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
