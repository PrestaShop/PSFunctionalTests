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
                    .pause(2000)
                    .waitForExist(this.selector.InstallationWizardPage.language_select, 300000)
                    .selectByValue(this.selector.InstallationWizardPage.language_select, 'en')
                    .waitForExist(this.selector.InstallationWizardPage.next_step_button, 300000)
                    .click(this.selector.InstallationWizardPage.next_step_button)
                    .call(done);
            });
        });
        describe('Step 2 : Agreeing license agreements', function () {
            it('should agree License agreements', function (done) {
                this.client
                    .waitForExist(this.selector.InstallationWizardPage.agree_checkbox, 300000)
                    .click(this.selector.InstallationWizardPage.agree_checkbox)
                    .waitForExist(this.selector.InstallationWizardPage.next_step_button, 300000)
                    .click(this.selector.InstallationWizardPage.next_step_button)
                    .call(done);
            });
        });
        describe('Step 3 : Checking system compatibility', function () {
            it('should test compatibility ', function (done) {
                this.client
                    .waitForExist(this.selector.InstallationWizardPage.test_result_compatibility_green_block, 300000)
                    .waitForExist(this.selector.InstallationWizardPage.next_step_button, 300000)
                    .click(this.selector.InstallationWizardPage.next_step_button)
                    .call(done);
            });
        });
        describe('Step 4 : Inserting the shop information', function () {
            it('should enter the name of the shop', function (done) {
                this.client
                    .waitForExist(this.selector.InstallationWizardPage.shop_name_input, 300000)
                    .setValue(this.selector.InstallationWizardPage.shop_name_input, "prestashop_1.7.0.3")
                    .call(done);
            });
            it('should enter the country', function (done) {
                this.client
                    .click(this.selector.InstallationWizardPage.country_select)
                    .click(this.selector.InstallationWizardPage.country_france_option)
                    .call(done);
            });
            it('should enter the firstname', function (done) {
                this.client
                    .waitForExist(this.selector.InstallationWizardPage.first_name_input, 300000)
                    .setValue(this.selector.InstallationWizardPage.first_name_input, "demo")
                    .call(done);
            });
            it('should enter the lastname', function (done) {
                this.client
                    .waitForExist(this.selector.InstallationWizardPage.last_name_input, 300000)
                    .setValue(this.selector.InstallationWizardPage.last_name_input, "prestashop")
                    .call(done);
            });
            it('should enter the email address', function (done) {
                this.client
                    .waitForExist(this.selector.InstallationWizardPage.email_address_input, 300000)
                    .setValue(this.selector.InstallationWizardPage.email_address_input, "demo@prestashop.com")
                    .call(done);
            });
            it('should enter the shop password', function (done) {
                this.client
                    .waitForExist(this.selector.InstallationWizardPage.shop_password_input, 300000)
                    .setValue(this.selector.InstallationWizardPage.shop_password_input, "prestashop_demo")
                    .call(done);
            });
            it('should retype password', function (done) {
                this.client
                    .waitForExist(this.selector.InstallationWizardPage.retype_password_input, 300000)
                    .setValue(this.selector.InstallationWizardPage.retype_password_input, "prestashop_demo")
                    .call(done);
            });
            it('should click on button next step', function (done) {
                this.client
                    .waitForExist(this.selector.InstallationWizardPage.next_step_button, 300000)
                    .click(this.selector.InstallationWizardPage.next_step_button)
                    .call(done);
            });
        });
        describe('Step 5 : Setting the BD configuration', function () {
            it('should enter the database address', function (done) {
                this.client
                    .waitForExist(this.selector.InstallationWizardPage.database_address_input, 300000)
                    .setValue(this.selector.InstallationWizardPage.database_address_input, "mysql")
                    .call(done);
            });
            it('should enter the database name', function (done) {
                this.client
                    .waitForExist(this.selector.InstallationWizardPage.database_name_input, 300000)
                    .setValue(this.selector.InstallationWizardPage.database_name_input, "prestashop")
                    .call(done);
            });
            it('should enter the database login', function (done) {
                this.client
                    .waitForExist(this.selector.InstallationWizardPage.database_login_input, 300000)
                    .setValue(this.selector.InstallationWizardPage.database_login_input, "root")
                    .call(done);
            });
            it('should enter the database password', function (done) {
                this.client
                    .waitForExist(this.selector.InstallationWizardPage.database_password_input, 300000)
                    .setValue(this.selector.InstallationWizardPage.database_password_input, "doge")
                    .call(done);
            });
            it('should validate the connection', function (done) {
                this.client
                    .waitForExist(this.selector.InstallationWizardPage.test_conection_button, 300000)
                    .click(this.selector.InstallationWizardPage.test_conection_button)
                    .waitForExist(this.selector.InstallationWizardPage.dbResultCheck_green_block, 300000)
                    .call(done);
            });
            it('should click on button next step', function (done) {
                this.client
                    .waitForExist(this.selector.InstallationWizardPage.next_step_button, 300000)
                    .click(this.selector.InstallationWizardPage.next_step_button)
                    .call(done);
            });
        });
        describe('Step 6 : Checking installation', function () {
            it('should create file parameter', function (done) {
                this.client
                    .waitForVisible(this.selector.InstallationWizardPage.create_file_parameter_step, 300000)
                    .call(done);
            });
            it('should create database', function (done) {
                this.client
                    .waitForVisible(this.selector.InstallationWizardPage.create_database_step, 9000000)
                    .call(done);
            });
            it('should create default shop', function (done) {
                this.client
                    .waitForVisible(this.selector.InstallationWizardPage.create_default_shop_step, 9000000)
                    .call(done);
            });
            it('should create database table', function (done) {
                this.client
                    .waitForVisible(this.selector.InstallationWizardPage.create_database_table_step, 9000000)
                    .call(done);
            });
            it('should create shop information', function (done) {
                this.client
                    .waitForVisible(this.selector.InstallationWizardPage.create_shop_informations_step, 9000000)
                    .call(done);
            });
            it('should create demonstration data', function (done) {
                this.client
                    .waitForVisible(this.selector.InstallationWizardPage.create_demonstration_data_step, 9000000)
                    .call(done);
            });
            it('should create install module', function (done) {
                this.client
                    .waitForVisible(this.selector.InstallationWizardPage.install_module_step, 9000000)
                    .call(done);
            });
            it('should create addons modules', function (done) {
                this.client
                    .waitForVisible(this.selector.InstallationWizardPage.install_addons_modules_step, 9000000)
                    .call(done);
            });
            it('should create install theme', function (done) {
                this.client
                    .waitForVisible(this.selector.InstallationWizardPage.install_theme_step, 9000000)
                    .call(done);
            });
            it('should finish installation', function (done) {
                this.client
                    .waitForVisible(this.selector.InstallationWizardPage.finish_step, 90000000)
                    .call(done);
            });
        });
    });
}
