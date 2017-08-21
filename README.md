# Run test with docker

## pre-requisite
- Install docker
- Install docker-compose

## run the tests
docker-compose up

This will
- start a mysql container
- start a selenium-chrome container
- start a prestashop container and launch prestashop installation
- start the tests container and launch the test in /tmp/test/itg/1.7/index.webdriverio.js

Environnement variable can be used to override
PS_VERSION=1.6|1.7 (Default:1.7)
URL=domain name where prestashop is running (default:prestashop)
MODULE= to install a module (default:)
SCRIPT= to change the script to launch (default:)

Exemple:
Modify docker-compose.yml to add the environment variables in the tests service section

After docker-compose up when db, selenium-chrome and prestashop are running you can launch the tests with:
docker-compose run tests -e MODULE=data-tech-name


# Run test without docker
Information: To use the following test suites, you need to install a PrestaShop in English in country France.
(or you may change some assertions like the separator “,” or “.”, “€” or “$” or “£” or …)
You need to create a user in Back Office with SuperAdmin rights and the following information’s:
Login: demo@prestashop.com
Password: demo_prestashop

a)	Installation
To use nodeJS tests, you need to install:
-	NodeJS
-	Npm
-	Webdrivers pour Chrome et firefox

Required modules to install using npm are:
-	json
-	minimist
-	mocha
-	node-uuid
-	parsed-url
-	q
-	req
-	should
-	webdriverio
-	window
-	selenium-standalone

b)	How to launch tests

-	First, you need to start selenium-standalone
-	Go to the folder of the version you want to test (in \test\itg, go into folder 1.6 or 1.7) and execute one of the following lines:

-        Launch tests without module installation :
mocha index.webdriverio.js --URL=localhost/1.7.0.0

-           Launch tests with module installation:
mocha index.webdriverio.js --URL=localhost/1.7.0.0 --MODULE=statsbestmanufacturers

-        Launch tests without module installation :
mocha index.webdriverio.js --URL=localhost/1.7.0.0 –SAUCELABS=true



-	URL: Front office URL of your prestashop website (without the “http://”)
-	MODULE (optional) : « data-tech-name »  of the module
-	SAUCELABS (optional): Turn it to « true » to use SauceLabs (you need to provide yours SauceLabs ID in your Travis folder)


Information: To select the module to test, we decided to use the « data-tech-name » because this variable give us only one result in the search module part, in this case we are sure to select the right module

# Sending generated report via mail
In case you want to send the generated report via mail, you should active the option "less secure apps" in the mailbox of the sender:
https://support.google.com/accounts/answer/6010255?hl=fr