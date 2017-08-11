'use strict';
var common = require('./common.webdriverio');
var path = require('path');
var should = require('should');
var argv = require('minimist')(process.argv.slice(2));

global.date_time = new Date().getTime();
global.URL = argv.URL;
global.module_tech_name = argv.MODULE;
global.saucelabs = argv.SAUCELABS;
global.selenium_url = argv.SELENIUM;
global._projectdir = path.join(__dirname, '..', '..');
global.product_id = new Date().getTime();
global.new_customer_email = 'pub' + date_time + '@prestashop.com';


module.exports = {
    selector: {
        //Back office
        BO :{
            Access:{
                login: '#email',
                password: '#passwd',
                login_btn: '#login_form > div.form-group.row-padding-top > button',
            },
            Product:{
                products: '#maintab-AdminCatalog > a',
                new_product: '#page-header-desc-product-new_product',
                product_name: '#name_1',
                save_and_stay_product: '[name="submitAddproductAndStay"]',
                green_validation: '.alert.alert-success',
                red_validation: '.alert.alert-danger',
                close_green_validation: '.alert.alert-success > .close',
                proceed_installation_anyway_button: '//div[@id="moduleNotTrusted"]//a[@id="proceed-install-anyway"]',
                menu: '#nav-sidebar',
                summary: 'description_short_1_ifr', //not declare like an id because using into function "frame" that not need this information;
                description: 'description_1_ifr',//not declare like an id because using into function "frame" that not need this information;
                product_price: '#link-Prices',
                wholesale_price: '#wholesale_price',
                priceTE: '#priceTE',
                save_and_stay_price: '(//div[@id="product-prices"]/div/button[@class="btn btn-default pull-right"])[2]/i[@class="process-icon-save"]',
                product_quantity: '#link-Quantities',
                quantity: '[name="qty_0"]',
                product_picture: '#link-Images',
                picture: '#file',
                upload_file_button: '#file-upload-button',
                upload_succes: '.alert.alert-success',
                catalogue_filter_by_name: '[name="productFilter_b!name"]',
                catalogue_submit_filter: '#submitFilterButtonproduct',
                edit_product: '.edit.btn.btn-default',
            },
            Order:{
                orders: '#maintab-AdminParentOrders',
                form: '#form-order',
                product_name: '.productName',
                quantity: '.product_quantity_show',
                total: '#total_order > td.amount.text-right.nowrap',
                new: '.process-icon-new',
                new_client: '#customer',
                new_client_choose: '[data-customer="1"]',
                new_product: '#product',
                new_product_name_list: '#id_product',
                new_product_name_choose: '(//select[@id="id_product"]/option)[1]',
                new_product_combination_list: '//select[@class="id_product_attribute" and @style=""]',
                new_product_combination_1: '(//select[@class="id_product_attribute" and @style=""]/option)[1]',
            },

            Module:{
                menu: '.icon-AdminParentModules',
                search: '#moduleQuicksearch',
            }
         },

        //Front office
        FO:{
            Access:{
                login: '.login',
                login_email: '#email',
                password: '#passwd',
                login_btn: '#SubmitLogin',
                logout: '.logout',
                logo_home_page: '.logo.img-responsive'
            },

            CreateAccount:{
                account: '#email_create',
                button: '#SubmitCreate',
                firstname: '#customer_firstname',
                lastname: '#customer_lastname',
                email: '#email',
                password: '#passwd',
               info_validate: '#submitAccount'
            },

            Product:{
                first_product_home_page: '.product_img_link',
                name_details: '[itemprop="name"]',
                price_details: '#our_price_display',
                quantity_details: '#quantity_wanted',
                details_first_product_home_page: '.button.lnk_view.btn.btn-default',
                first_product_home_page_name: '.product-name'
            },


            Layer_cart:{
                add_to_cart: '[name="Submit"]',
                cart_label: '#columns > div.breadcrumb.clearfix',
                layer_cart: '//div[@id="layer_cart" and contains(@style, "display: block;")]',
                name_details: 'span#layer_cart_product_title',
                price_details: 'span#layer_cart_product_price',
                quantity_details: 'span#layer_cart_product_quantity',
                command_button: '.btn.btn-default.button.button-medium'
            },

            Order:{
                button_checkout: '.button.btn.btn-default.standard-checkout.button-medium',
                button_checkout_step3: '//button[@name="processAddress"]',
                cgv: '#cgv',
                product_name_step5: '.cart_description > p > a',
                total_price: '#total_price',
                pay_bankwire: '.bankwire',
                price_step5_amout: '#amount',
                confirm_button: '#cart_navigation > button',
                success_alert: '.alert.alert-success',
                success_price: '.price > strong'
            },

            Search_product:{
                search_product: '#search_query_top',
                product_button: '[name="submit_search"]',
                result_name: '[itemprop="url"]',
                result_price: '.price.product-price',
                details: '.button.lnk_view.btn.btn-default'
            }

            },


    },
    shouldExist: function (err, existing) {
        should(err).be.not.defined;
        should(existing).be.true;
    }
};
