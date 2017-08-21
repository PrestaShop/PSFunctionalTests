'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');
var path = require('path');
var toUpload = path.join(__dirname, '../..', 'datas', 'image_test.jpg');

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
            //.signinBO()
                .url('http://' + URL + '/admin-dev')
                .waitForExist(this.selector.BO.Access.login_input, 120000)
                .setValue(this.selector.BO.Access.login_input, 'demo@prestashop.com')
                .waitForExist(this.selector.BO.Access.password_input, 120000)
                .setValue(this.selector.BO.Access.password_input, 'prestashop_demo')
                .waitForExist(this.selector.BO.Access.login_button, 90000)
                .click(this.selector.BO.Access.login_button)
                .waitForExist(this.selector.BO.Product.menu, 60000)
                .call(done);
        });
    });

    describe('Create new product', function (done) {
        it("should go to the products page", function (done) {
            global.fctname = this.test.title;
            this.client
                .click(this.selector.BO.Product.products)
                .waitForExist(this.selector.BO.Product.new_product, 120000)
                .call(done);
        });

        it("should click on the <add new product> button", function (done) {
            this.client
                .waitForExist(this.selector.BO.Product.new_product, 120000)
                .click(this.selector.BO.Product.new_product)
                .waitForExist(this.selector.BO.Product.product_name, 60000)
                .call(done);
        });

        it('should enter the product name', function (done) {
            global.fctname = this.test.title;
            this.client
                .setValue(this.selector.BO.Product.product_name, 'test_nodejs_' + product_id)
                .pause(60000)
                .call(done);
        });

        it('should enter the product summary', function (done) {
            global.fctname = this.test.title;
            this.client
                .frame(this.selector.BO.Product.summary, function (err, result) {
                    if (err) console.log(err);
                })
                .setValue("#tinymce", "this is the summary")
                .frameParent()
                .pause(2000)
                .call(done);
        });

        it('should enter the product description', function (done) {
            global.fctname = this.test.title;
            this.client
                .frame(this.selector.BO.Product.description_tab, function (err, result) {
                    if (err) console.log(err);
                })
                .setValue("#tinymce", "this is the description")
                .frameParent()
                .pause(2000)
                .call(done);
        });

        it('should save and stay in the poduct page', function (done) {
            global.fctname = this.test.title;
            this.client
                .click(this.selector.BO.Product.save_and_stay_product)
                .waitForExist(this.selector.BO.Product.close_green_validation, 60000)
                .click(this.selector.BO.Product.close_green_validation)
                .call(done);
        });

        it('should go to the product prices form', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.Product.product_price, 60000)
                .click(this.selector.BO.Product.product_price)
                .waitForExist(this.selector.BO.Product.wholesale_price, 60000)
                .call(done);
        });

        it('should enter the product price information', function (done) {
            global.fctname = this.test.title;
            this.client
                .click(this.selector.BO.Product.wholesale_price)
                .pause(2000)
                .setValue(this.selector.BO.Product.wholesale_price, "2")
                .click(this.selector.BO.Product.priceTE)
                .pause(2000)
                .setValue(this.selector.BO.Product.priceTE, "5")
                .call(done);

        });

        it('should save and stay in the product page', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.Product.save_and_stay_price, 60000)
                .click(this.selector.BO.Product.save_and_stay_price)
                .waitForExist(this.selector.BO.Product.close_green_validation, 60000)
                .click(this.selector.BO.Product.close_green_validation)
                .call(done);
        });

        it('should go to the product quantity form', function (done) {
            this.client
                .click(this.selector.BO.Product.product_quantity)
                .waitForExist(this.selector.BO.Product.quantity, 60000)
                .call(done);
        });

        it('should enter the product quantity', function (done) {
            global.fctname = this.test.title;
            this.client
                .click(this.selector.BO.Product.quantity)
                .addValue(this.selector.BO.Product.quantity, "1000")
                .call(done);
        });

        it('should go to the product image settings', function (done) {
            global.fctname = this.test.title;
            this.client
                .click(this.selector.BO.Product.product_picture)
                .waitForExist(this.selector.BO.Product.picture, 60000)
                .call(done);
        });

        it('should set the product image', function (done) {
            global.fctname = this.test.title;
            this.client
                .execute(function () {
                    document.getElementById("file").style = "";
                })
                .chooseFile(this.selector.BO.Product.picture, toUpload)
                .pause(3000)
                .waitForExist(this.selector.BO.Product.upload_file_button, 60000)
                .click(this.selector.BO.Product.upload_file_button)
                .waitForExist(this.selector.BO.Product.upload_succes, 60000)
                .getAttribute('img[title=' + 'test_nodejs_' + product_id + ']', "src").then(function (text) {
                var src_creation_temp = text;
                var src_creation_temp2 = src_creation_temp.split("/img");
                var src_creation_temp3 = src_creation_temp2[1].split("?time");
                global.src_creation = src_creation_temp3[0];
            })
                .call(done);
        });
    });

    describe('Check the product in the catalog', function (done) {
        it('should go to the catalog', function (done) {
            global.fctname = this.test.title;
            this.client
                .click(this.selector.BO.Product.products)
                .waitForExist(this.selector.BO.Product.catalogue_filter_by_name, 60000)
                .call(done)
        });

        it('should search the product by name', function (done) {
            this.client
                .setValue(this.selector.BO.Product.catalogue_filter_by_name, 'test_nodejs_' + product_id)
                .click(this.selector.BO.Product.catalogue_submit_filter)
                .waitForExist(this.selector.BO.Product.edit_product, 60000)
                .call(done);
        });
    });

    describe('Check the product details in Back Office', function (done) {
        it('should acces to the product page', function (done) {
            global.fctname = this.test.title;
            this.client
                .click(this.selector.BO.Product.edit_product)
                .waitForExist(this.selector.BO.Product.product_name, 60000)
                .call(done);
        });

        it('should check the product name', function (done) {
            global.fctname = this.test.title;
            this.client
                .getValue(this.selector.BO.Product.product_name).then(function (text) {
                var my_name = text;
                should(my_name).be.equal('test_nodejs_' + product_id);
            })
                .pause(60000)
                .call(done);
        });

        it('should check the product summary', function (done) {
            global.fctname = this.test.title;
            this.client
                .frame(this.selector.BO.Product.summary, function (err, result) {
                    if (err) console.log(err);
                })
                .getText("#tinymce").then(function (text) {
                var my_summary = text;
                should(my_summary).be.equal("this is the summary");
            })
                .frameParent()
                .call(done);
        });

        it('should check the product description', function (done) {
            global.fctname = this.test.title;
            this.client
                .frame(this.selector.BO.Product.description_textarea, function (err, result) {
                    if (err) console.log(err);
                })
                .getText("#tinymce").then(function (text) {
                var my_description = text;
                should(my_description).be.equal("this is the description");
            })
                .frameParent()
                .call(done);
        });

        it('should go to the product prices form', function (done) {
            global.fctname = this.test.title;
            this.client
                .click(this.selector.BO.Product.product_price)
                .waitForExist(this.selector.BO.Product.wholesale_price, 60000)
                .call(done);
        });

        it('should check the product price', function (done) {
            global.fctname = this.test.title;
            this.client
                .getValue(this.selector.BO.Product.wholesale_price).then(function (text) {
                var my_wholesale_price = text;
                should(parseInt(my_wholesale_price)).be.equal(parseInt("2"));
            })
                .getValue(this.selector.BO.Product.priceTE).then(function (text) {
                var my_priceTE = text;
                should(parseInt(my_priceTE)).be.equal(parseInt("5"));
            })
                .call(done);
        });

        it('should go to the product quantity form', function (done) {
            this.client
                .click(this.selector.BO.Product.product_quantity)
                .waitForExist(this.selector.BO.Product.quantity, 60000)
                .call(done);
        });

        it('should check the product quantity', function (done) {
            global.fctname = this.test.title;
            this.client
                .getValue(this.selector.BO.Product.quantity).then(function (text) {
                var my_quantity = text;
                should(parseInt(my_quantity)).be.equal(parseInt("1000"))
            })
                .call(done);
        });

        it('should go to the product image settings', function (done) {
            this.client
                .click(this.selector.BO.Product.product_picture)
                .waitForExist(this.selector.BO.Product.upload_file_button, 60000)
                .call(done);
        });

        it('should check the product image', function (done) {
            global.fctname = this.test.title;
            this.client
                .getAttribute('img[title=' + 'test_nodejs_' + product_id + ']', "src").then(function (text) {
                var my_src_temp = text[0];
                var my_src_temp2 = my_src_temp.split("/img");
                var my_src_temp3 = my_src_temp2[1].split("?time");
                should(my_src_temp3[0]).be.equal(src_creation);
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

});