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
        //BO

        BO :{
            AccessPage:{
                login_input: '#email',
                password_input: '#passwd',
                login_button: '#login_form > div.form-group.row-padding-top > button'
            },

            AddProductPage:{
                catalog_maintab: '#maintab-AdminCatalog > a',
                new_product_button: '#page-header-desc-product-new_product',
                product_name_input: '#name_1',
                save_and_stay_product_button: '[name="submitAddproductAndStay"]',
                green_validation_alert: '.alert.alert-success',
                red_validation_alert: '.alert.alert-danger',
                close_green_validation_button: '.alert.alert-success > .close',
                proceed_installation_anyway_button: '//div[@id="moduleNotTrusted"]//a[@id="proceed-install-anyway"]',
                menu: '#nav-sidebar',
                summary_textarea: 'description_short_1_ifr', //not declare like an id because using into function "frame" that not need this information;
                description_textarea: 'description_1_ifr',//not declare like an id because using into function "frame" that not need this information;
                product_price_tab: '#link-Prices',
                wholesale_price_input: '#wholesale_price',
                priceTE_input: '#priceTE',
                save_and_stay_price_button: '(//div[@id="product-prices"]/div/button[@class="btn btn-default pull-right"])[2]/i[@class="process-icon-save"]',
                product_quantity_tab: '#link-Quantities',
                quantity_input: '[name="qty_0"]',
                product_picture_tab: '#link-Images',
                picture: '#file',
                upload_file_button: '#file-upload-button',
                upload_succes_alert: '.alert.alert-success',
                catalogue_filter_by_name_input: '[name="productFilter_b!name"]',
                catalogue_submit_filter_button: '#submitFilterButtonproduct',
                edit_product_button: '.edit.btn.btn-default'
            },
            OrderPage:{
                orders_maintab: '#maintab-AdminParentOrders',
                form: '#form-order',
                product_name_span: '.productName',
                quantity_span: '.product_quantity_show',
                total: '#total_order > td.amount.text-right.nowrap',
                new_order_button: '.process-icon-new',
                search_customer_input: '#customer',
                new_client_choose_button: '[data-customer="1"]',
                search_product_input: '#product',
                new_product_name_list: '#id_product',
                new_product_name_choose: '(//select[@id="id_product"]/option)[1]',
                new_product_combination_list: '//select[@class="id_product_attribute" and @style=""]',
                new_product_combination_choose: '(//select[@class="id_product_attribute" and @style=""]/option)[1]'
            },
            ModulePage:{
                menu: '.icon-AdminParentModules',
                search: '#moduleQuicksearch'
            }
        },

        //FO

        FO:{
            AccessPage:{
                sign_in_button: '.login',
                email_input: '#email',
                password_input: '#passwd',
                login_button: '#SubmitLogin',
                sign_out_button: '.logout',
                logo_home_page: '.logo.img-responsive'
            },
            CreateAccountPage:{
                email_address_input: '#email_create',
                create_button: '#SubmitCreate',
                firstname_input: '#customer_firstname',
                lastname_input: '#customer_lastname',
                email_input: '#email',
                password_input: '#passwd',
                info_validate_button: '#submitAccount'
            },
            ProductDetailsPage:{
                first_product_home_page: '.product_img_link',
                name_details: '[itemprop="name"]',
                price_details: '#our_price_display',
                quantity_details: '#quantity_wanted',
                details_first_product_home_page: '.button.lnk_view.btn.btn-default',
                first_product_home_page_name: '.product-name'
            },
            LayerCartPage:{
                add_to_cart_button: '[name="Submit"]',
                cart_label: '#columns > div.breadcrumb.clearfix',
                layer_cart: '//div[@id="layer_cart" and contains(@style, "display: block;")]',
                name_details: 'span#layer_cart_product_title',
                price_details: 'span#layer_cart_product_price',
                quantity_details: 'span#layer_cart_product_quantity',
                command_button: '.btn.btn-default.button.button-medium'
            },
            BuyOrderPage:{
                button_checkout: '.button.btn.btn-default.standard-checkout.button-medium',
                button_checkout_step3: '//button[@name="processAddress"]',
                cgv_button: '#cgv',
                product_name_step5: '.cart_description > p > a',
                total_price: '#total_price',
                pay_bankwire: '.bankwire',
                price_step5_amout: '#amount',
                confirm_button: '#cart_navigation > button',
                success_alert: '.alert.alert-success',
                success_price: '.price > strong'
            },
            SearchProductPage:{
                search_product_input: '#search_query_top',
                search_product_button: '[name="submit_search"]',
                search_result_name: '[itemprop="url"]',
                search_result_price: '.price.product-price',
                details: '.button.lnk_view.btn.btn-default'
            }
        }
    },
    shouldExist: function (err, existing) {
        should(err).be.not.defined;
        should(existing).be.true;
    }
};
