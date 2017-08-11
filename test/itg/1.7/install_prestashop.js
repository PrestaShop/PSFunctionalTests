'use strict';
var common = require('./common.webdriverio');
var globals = require('./globals.webdriverio.js');

describe('The shop installation', function () {
    common.initMocha.call(this);
    runScenario();
});
function runScenario() {
    describe('Installation steps :', function () {
        before(function (done) {
            this.selector = globals.selector;
            this.client.call(done);
        });
        after(common.after);
        describe('Step 1 : Choosing language', function () {
            it('should choose english language', function (done) {
                this.client
                    .localhost()
                    .waitForExist(this.selector.Install.language, 300000)
                    .selectByIndex(this.selector.Install.language, 3)
                    .waitForExist(this.selector.Install.next_step, 300000)
                    .click(this.selector.Install.next_step)
                    .call(done);
            });test_result_compatibility
        });
        describe('Step 2 : Agreeing license agreements', function () {
            it('should agree License agreements', function (done) {
                this.client
                    .waitForExist(this.selector.Install.agree_checkbox, 300000)
                    .click(this.selector.Install.agree_checkbox)
                    .waitForExist(this.selector.Install.next_step, 300000)
                    .click(this.selector.Install.next_step)
                    .call(done);
            });
        });
        describe('Step 3 : Checking system compatibility', function () {
            it('should test compatibility ', function (done) {
                this.client
                    .waitForExist(this.selector.Install.test_result_compatibility, 300000)
                    .waitForExist(this.selector.Install.next_step, 300000)
                    .click(this.selector.Install.next_step)
                    .call(done);
            });
        });
        describe('Step 4 : Inserting the shop information', function () {
            it('should enter the name of the shop', function (done) {
                this.client
                    .waitForExist(this.selector.Install.shop_name, 300000)
                    .setValue(this.selector.Install.shop_name, "prestashop_1.7.0.3")
                    .call(done);
            });
            it('should enter the country', function (done) {
                this.client
                    .click(this.selector.Install.country_fo)
                    .click(this.selector.Install.country_france)
                    .call(done);
            });
            it('should enter the firstname', function (done) {
                this.client
                    .waitForExist(this.selector.Install.first_name, 300000)
                    .setValue(this.selector.Install.first_name, "demo")
                    .call(done);
            });
            it('should enter the lastname', function (done) {
                this.client
                    .waitForExist(this.selector.Install.last_name, 300000)
                    .setValue(this.selector.Install.last_name, "prestashop")
                    .call(done);
            });
            it('should enter the email address', function (done) {
                this.client
                    .waitForExist(this.selector.Install.email_address, 300000)
                    .setValue(this.selector.Install.email_address, "demo@prestashop.com")
                    .call(done);
            });
            it('should enter the shop password', function (done) {
                this.client
                    .waitForExist(this.selector.Install.shop_password, 300000)
                    .setValue(this.selector.Install.shop_password, "prestashop_demo")
                    .call(done);
            });
            it('should retype password', function (done) {
                this.client
                    .waitForExist(this.selector.Install.retype_password, 300000)
                    .setValue(this.selector.Install.retype_password, "prestashop_demo")
                    .call(done);
            });
            it('should click on button next step', function (done) {
                this.client
                    .waitForExist(this.selector.Install.next_step, 300000)
                    .click(this.selector.Install.next_step)
                    .call(done);
            });
        });
        describe('Step 5 : Setting the BD configuration', function () {
            it('should enter the database address', function (done) {
                this.client
                    .waitForExist(this.selector.Install.database_address, 300000)
                    .setValue(this.selector.Install.database_address, "mysql")
                    .call(done);
            });
            it('should enter the database name', function (done) {
                this.client
                    .waitForExist(this.selector.Install.database_name, 300000)
                    .setValue(this.selector.Install.database_name, "prestashop")
                    .call(done);
            });
            it('should enter the database login', function (done) {
                this.client
                    .waitForExist(this.selector.Install.database_login, 300000)
                    .setValue(this.selector.Install.database_login, "root")
                    .call(done);
            });
            it('should enter the database password', function (done) {
                this.client
                    .waitForExist(this.selector.Install.database_password, 300000)
                    .setValue(this.selector.Install.database_password, "doge")
                    .call(done);
            });
            it('should validate the connection', function (done) {
                this.client
                    .waitForExist(this.selector.Install.test_conection, 300000)
                    .click(this.selector.Install.test_conection)
                    .waitForExist(this.selector.Install.dbResultCheck, 300000)
                    .call(done);
            });
            it('should click on button next step', function (done) {
                this.client
                    .waitForExist(this.selector.Install.next_step, 300000)
                    .click(this.selector.Install.next_step)
                    .call(done);
            });
        });
        describe('Step 6 : Checking installation', function () {
            it('should create file parameter', function (done) {
                this.client
                    .waitForVisible(this.selector.Install.create_file_parameter_step, 300000)
                    .call(done);
            });
            it('should create database', function (done) {
                this.client
                    .waitForVisible(this.selector.Install.create_database_step, 9000000)
                    .call(done);
            });
            it('should create default shop', function (done) {
                this.client
                    .waitForVisible(this.selector.Install.create_default_shop_step, 9000000)
                    .call(done);
            });
            it('should create database table', function (done) {
                this.client
                    .waitForVisible(this.selector.Install.create_database_table_step, 9000000)
                    .call(done);
            });
            it('should create shop information', function (done) {
                this.client
                    .waitForVisible(this.selector.Install.create_shop_informations_step, 9000000)
                    .call(done);
            });
            it('should create demonstration data', function (done) {
                this.client
                    .waitForVisible(this.selector.Install.create_demonstration_data_step, 9000000)
                    .call(done);
            });
            it('should create install module', function (done) {
                this.client
                    .waitForVisible(this.selector.Install.install_module_step, 9000000)
                    .call(done);
            });
            it('should create addons modules', function (done) {
                this.client
                    .waitForVisible(this.selector.Install.install_addons_modules_step, 9000000)
                    .call(done);
            });
            it('should create install theme', function (done) {
                this.client
                    .waitForVisible(this.selector.Install.install_theme_step, 9000000)
                    .call(done);
            });
            it('should finish installation', function (done) {
                this.client
                    .waitForVisible(this.selector.Install.finish_step, 90000000)
                    .call(done);
            });
        });
    });
}