'use strict';

var fs = require('fs');
var optionsBrowserOld = require('../test/itg/1.6/common.webdriverio');
var optionsBrowserNew = require('../test/itg/1.7/common.webdriverio');


console.log();
console.log(optionsBrowserNew.browser());

// create reusable transporter object using the default SMTP transport
var nodeMailer = require('nodemailer');
var dateFormat = require('dateformat');

// get travis env variable
var SENDER_EMAIL   = process.env.SENDER_EMAIL;
var SENDER_PASSWORD   = process.env.SENDER_PASSWORD;
var RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL;

var Version = new Array();
Version = [1.6,1.7];

var transporter = nodeMailer.createTransport({
    service: 'Gmail',
    auth: {
        user: SENDER_EMAIL,
        pass: SENDER_PASSWORD
    }
});

console.log('Sending Email .....');
var day=dateFormat( "yyyy-mm-dd h:MM:ss");

if ( (fs.existsSync("email_sender/rapport_test_"+Version[0]+".html")) && (fs.existsSync("email_sender/rapport_test_"+Version[1]+".html")) ) {
    transporter.sendMail({
        from: SENDER_EMAIL, // sender address
        to: RECIPIENT_EMAIL, // list of receivers
        subject: '[PrestaShop][Test] Bilan de tests - '+day+' ]', // Subject line
        html: 'Bonjour,</br>' +
        "<br> Les résultats de l'exécution des tests automatisés (Node.js) sur les navigateur (" +optionsBrowserOld.browser()+","+optionsBrowserNew.browser()+") sont en pièce jointe.</br> " +
        '<br>Bien à vous,</br>'+
        '<br>Equipe QA</br>', // html body
        attachments: [
            {
                path: "email_sender/rapport_test_"+Version[0]+".html" // stream this file,
            },{
                filename:  "rapport_test_"+Version[1]+".html",
                path:  "email_sender/rapport_test_"+Version[1]+".html"
            }
        ]
    });
}else if(fs.existsSync("email_sender/rapport_test_"+Version[0]+".html")){
    transporter.sendMail({
        from: SENDER_EMAIL, // sender address
        to: RECIPIENT_EMAIL, // list of receivers
        subject: '[PrestaShop][Test] Bilan de tests - '+day+' ]', // Subject line
        html: 'Bonjour,</br>' +
        "<br> Les résultats de l'exécution des tests automatisés (Node.js) sur le navigateu (" +optionsBrowserOld.browser()+") sont en pièce jointe.</br> " +
        '<br>Bien à vous,</br>'+
        '<br>Equipe QA</br>', // html body
        attachments: [
            {
                path: "email_sender/rapport_test_"+Version[0]+".html" // stream this file,
            }
        ]
    });
}else{
    transporter.sendMail({
        from: SENDER_EMAIL, // sender address
        to: RECIPIENT_EMAIL, // list of receivers
        subject: '[PrestaShop][Test] Bilan de tests - '+day+' ]', // Subject line
        html: 'Bonjour,</br>' +
        "<br> Les résultats de l'exécution des tests automatisés (Node.js) sur le navigateu (" +optionsBrowserNew.browser()+") sont en pièce jointe.</br> " +
        '<br>Bien à vous,</br>'+
        '<br>Equipe QA</br>', // html body
        attachments: [
            {
                path: "email_sender/rapport_test_"+Version[1]+".html" // stream this file,
            }
        ]
    });
}
console.log("Email successfully sent!")

