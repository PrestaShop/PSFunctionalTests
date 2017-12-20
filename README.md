# Run test with docker

## Prerequisites
- Install docker
- Install docker-compose

## Run tests with Docker

    docker-compose up

This will
- start a mysql container
- start a selenium-chrome container
- start a prestashop container and launch prestashop installation
- start the tests container and launch the test in /tmp/test/itg/1.7/index.webdriverio.js

Environment variables can be used to override

| Variable | Values | Default |
| -------- | ------ | ------- |
| PS_VERSION | 1.6, 1.7 | 1.7) |
| URL | URL where prestashop is running, without http | prestashop |
| MODULE | Use to install a module | |
| SCRIPT | Use to change the script to launch | |

Example:

Modify docker-compose.yml to add the environment variables in the tests service section

After docker-compose up when db, selenium-chrome and prestashop are running you can launch the tests with:

    docker-compose run tests -e MODULE=data-tech-name

# Run test without docker
To use the following test suites, you need to install 

## Prerequisites

To use NodeJS tests, you need to install:
-	NodeJS
-	Npm
- PrestaShop (clean install)

#### About the PrestaShop install

PrestaShop needs to be installed in **English** with country configured to **France**.
(or you may change some assertions like the separator “,” or “.”, “€” or “$” or “£” or …).

You need to create the following user in the Back Office with **SuperAdmin** rights:
- **Login**: demo@prestashop.com
- **Password**: prestashop_demo

## Run the tests

1) The first time you run tests, you need to install selenium-standalone

        npm run install

2) Start selenium-standalone in another screen (because it will keep running)

        npm run server-start
        
3) Launch your test suite

    **Run everything**
   
        npm run test
       
    **Run tests while specifying URL**
   
        npm run test -- --url=localhost/psTest
       
    **Run a specific test**
   
        npm run test -- -g "Back Office"
       
### Another way
   
Go to the folder of the version you want to test (in \test\itg, go into folder 1.6 or 1.7) and execute one of the following lines:

Launch tests without module installation :

    mocha index.webdriverio.js --URL=localhost/1.7.0.0 –SAUCELABS=true --INSTALL=true

Launch tests with module installation:

    mocha index.webdriverio.js --URL=localhost/1.7.0.0 --MODULE=statsbestmanufacturers –SAUCELABS=true --INSTALL=true

**Parameters**

| Name | | Description |
| ---- | --- | ----------- |
| URL | | Front office URL of your prestashop website (without the “http://”) |
| MODULE | optional | « data-tech-name »  of the module |
| SAUCELABS | optional | Turn it to « true » to use SauceLabs (you need to provide yours SauceLabs ID in your Travis folder) |
| INSTALL | optional, default to false | Turn it to « true » to install PrestaShop before launching tests |
| DB_SERVER | optional, default to mysql | To add your database server address |
| DB_NAME | optional, default to prestashop | Set the database name |
| DB_USER | optional, default to root | To add your Database login |
| DB_PASSWD | optional, default doge | To add your Database password |
| DB_EMPTY_PASSWD | optional | Set it if your database doesn't require any password |

> **Note:** To select the module to test, we decided to use the « data-tech-name » because this variable give us only one result in the search module part, in this case we are sure to select the right module

## Re-run the tests

The tests shop should should be reinstalled before re-running the test suite.

You can do it quickly by running this script in your test shop directory:

```bash
#!/bin/bash

# Replace "psTest" with the name of your test database
mysql -u root -e "DROP DATABASE IF EXISTS \`psTest\`;"

# My test shop is located in http://localhost/psTest/
# Replace domain (localhost), base_uri (/psTest/) and db_name (psTest) with your own 
php install-dev/index_cli.php \
	--language=en \
	--country=fr \
	--domain=localhost \
	--base_uri=/psTest/ \
	--db_server=127.0.0.1 \
	--db_name=psTest \
	--db_create=1 \
	--name=prestashop.unit.test \
	--email=demo@prestashop.com \
	--password=prestashop_demo
```

Alternatively, you can reset the welcome module by running the following query:

```sql
DELETE FROM `ps_configuration` WHERE `name` LIKE '%onboard%';
```  

# Sending generated report via mail
In case you want to send the generated report via mail, you should active the option "less secure apps" in the mailbox of the sender:
https://support.google.com/accounts/answer/6010255?hl=fr
