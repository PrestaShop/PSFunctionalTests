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
                    .waitForExist(this.selector.Installation.language, 300000)
                    .selectByIndex(this.selector.Installation.language, 3)
                    .waitForExist(this.selector.Installation.next_step, 300000)
                    .click(this.selector.Installation.next_step)
                    .call(done);
            });test_result_compatibility
        });
        describe('Step 2 : Agreeing license agreements', function () {
            it('should agree License agreements', function (done) {
                this.client
                    .waitForExist(this.selector.Installation.agree_checkbox, 300000)
                    .click(this.selector.Installation.agree_checkbox)
                    .waitForExist(this.selector.Installation.next_step, 300000)
                    .click(this.selector.Installation.next_step)
                    .call(done);
            });
        });
        describe('Step 3 : Checking system compatibility', function () {
            it('should test compatibility ', function (done) {
                this.client
                    .waitForExist(this.selector.Installation.test_result_compatibility, 300000)
                    .waitForExist(this.selector.Installation.next_step, 300000)
                    .click(this.selector.Installation.next_step)
                    .call(done);
            });
        });
        describe('Step 4 : Inserting the shop information', function () {
            it('should enter the name of the shop', function (done) {
                this.client
                    .waitForExist(this.selector.Installation.shop_name, 300000)
                    .setValue(this.selector.Installation.shop_name, "prestashop_1.7.0.3")
                    .call(done);
            });
            it('should enter the country', function (done) {
                this.client
                    .click(this.selector.Installation.country_fo)
                    .click(this.selector.Installation.country_france)
                    .call(done);
            });
            it('should enter the firstname', function (done) {
                this.client
                    .waitForExist(this.selector.Installation.first_name, 300000)
                    .setValue(this.selector.Installation.first_name, "demo")
                    .call(done);
            });
            it('should enter the lastname', function (done) {
                this.client
                    .waitForExist(this.selector.Installation.last_name, 300000)
                    .setValue(this.selector.Installation.last_name, "prestashop")
                    .call(done);
            });
            it('should enter the email address', function (done) {
                this.client
                    .waitForExist(this.selector.Installation.email_address, 300000)
                    .setValue(this.selector.Installation.email_address, "demo@prestashop.com")
                    .call(done);
            });
            it('should enter the shop password', function (done) {
                this.client
                    .waitForExist(this.selector.Installation.shop_password, 300000)
                    .setValue(this.selector.Installation.shop_password, "prestashop_demo")
                    .call(done);
            });
            it('should retype password', function (done) {
                this.client
                    .waitForExist(this.selector.Installation.retype_password, 300000)
                    .setValue(this.selector.Installation.retype_password, "prestashop_demo")
                    .call(done);
            });
            it('should click on button next step', function (done) {
                this.client
                    .waitForExist(this.selector.Installation.next_step, 300000)
                    .click(this.selector.Installation.next_step)
                    .call(done);
            });
        });
        describe('Step 5 : Setting the BD configuration', function () {
            it('should enter the database address', function (done) {
                this.client
                    .waitForExist(this.selector.Installation.database_address, 300000)
                    .setValue(this.selector.Installation.database_address, "mysql")
                    .call(done);
            });
            it('should enter the database name', function (done) {
                this.client
                    .waitForExist(this.selector.Installation.database_name, 300000)
                    .setValue(this.selector.Installation.database_name, "prestashop")
                    .call(done);
            });
            it('should enter the database login', function (done) {
                this.client
                    .waitForExist(this.selector.Installation.database_login, 300000)
                    .setValue(this.selector.Installation.database_login, "root")
                    .call(done);
            });
            it('should enter the database password', function (done) {
                this.client
                    .waitForExist(this.selector.Installation.database_password, 300000)
                    .setValue(this.selector.Installation.database_password, "doge")
                    .call(done);
            });
            it('should validate the connection', function (done) {
                this.client
                    .waitForExist(this.selector.Installation.test_conection, 300000)
                    .click(this.selector.Installation.test_conection)
                    .waitForExist(this.selector.Installation.dbResultCheck, 300000)
                    .call(done);
            });
            it('should click on button next step', function (done) {
                this.client
                    .waitForExist(this.selector.Installation.next_step, 300000)
                    .click(this.selector.Installation.next_step)
                    .call(done);
            });
        });
        describe('Step 6 : Checking installation', function () {
            it('should create file parameter', function (done) {
                this.client
                    .waitForVisible(this.selector.Installation.create_file_parameter_step, 300000)
                    .call(done);
            });
            it('should create database', function (done) {
                this.client
                    .waitForVisible(this.selector.Installation.create_database_step, 9000000)
                    .call(done);
            });
            it('should create default shop', function (done) {
                this.client
                    .waitForVisible(this.selector.Installation.create_default_shop_step, 9000000)
                    .call(done);
            });
            it('should create database table', function (done) {
                this.client
                    .waitForVisible(this.selector.Installation.create_database_table_step, 9000000)
                    .call(done);
            });
            it('should create shop information', function (done) {
                this.client
                    .waitForVisible(this.selector.Installation.create_shop_informations_step, 9000000)
                    .call(done);
            });
            it('should create demonstration data', function (done) {
                this.client
                    .waitForVisible(this.selector.Installation.create_demonstration_data_step, 9000000)
                    .call(done);
            });
            it('should create install module', function (done) {
                this.client
                    .waitForVisible(this.selector.Installation.install_module_step, 9000000)
                    .call(done);
            });
            it('should create addons modules', function (done) {
                this.client
                    .waitForVisible(this.selector.Installation.install_addons_modules_step, 9000000)
                    .call(done);
            });
            it('should create install theme', function (done) {
                this.client
                    .waitForVisible(this.selector.Installation.install_theme_step, 9000000)
                    .call(done);
            });
            it('should finish installation', function (done) {
                this.client
                    .waitForVisible(this.selector.Installation.finish_step, 90000000)
                    .call(done);
            });
        });
    });
}