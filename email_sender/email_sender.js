'use strict';

var fs = require('fs');
var optionsBrowserOld = require('../test/itg/1.6/common.webdriverio');
var optionsBrowserNew = require('../test/itg/1.7/common.webdriverio');


// create reusable transporter object using the default SMTP transport
var nodeMailer = require('nodemailer');
var dateFormat = require('dateformat');

// get travis env variable
var senderEmail = process.env.SENDER_EMAIL;
var senderPassword = process.env.SENDER_PASSWORD;
var recipientEmail = process.env.RECIPIENT_EMAIL;

var version = new Array();
version = [1.6,1.7];

var transporter = nodeMailer.createTransport({
    service: 'Gmail',
    auth: {
        user: senderEmail,
        pass: senderPassword
    }
});

console.log('Sending Email .....');
var day=dateFormat( "yyyy-mm-dd h:MM:ss");

if ( (fs.existsSync("email_sender/rapport_test_"+version[0]+".html")) && (fs.existsSync("email_sender/rapport_test_"+version[1]+".html")) ) {
    transporter.sendMail({
        from: senderEmail, // sender address
        to: recipientEmail, // list of receivers
        subject: '[PrestaShop][Test] Bilan de tests - '+day+' ]', // Subject line
        html: 'Bonjour,</br>' +
        "<br> Les résultats de l'exécution des tests automatisés (Node.js) sur les navigateur (" +optionsBrowserOld.browser()+","+optionsBrowserNew.browser()+") sont en pièce jointe.</br> " +
        '<br>Bien à vous,</br>'+
        '<br>Equipe QA</br>', // html body
        attachments: [
            {
                path: "email_sender/rapport_test_"+version[0]+".html" // stream this file,
            },{
                filename:  "rapport_test_"+version[1]+".html",
                path:  "email_sender/rapport_test_"+version[1]+".html"
            }
        ]
    });
}else if(fs.existsSync("email_sender/rapport_test_"+version[0]+".html")){
    transporter.sendMail({
        from: senderEmail, // sender address
        to: recipientEmail, // list of receivers
        subject: '[PrestaShop][Test] Bilan de tests - '+day+' ]', // Subject line
        html: 'Bonjour,</br>' +
        "<br> Les résultats de l'exécution des tests automatisés (Node.js) sur le navigateur (" +optionsBrowserOld.browser()+") sont en pièce jointe.</br> " +
        '<br>Bien à vous,</br>'+
        '<br>Equipe QA</br>', // html body
        attachments: [
            {
                path: "email_sender/rapport_test_"+version[0]+".html" // stream this file,
            }
        ]
    });
}else{
    transporter.sendMail({
        from: senderEmail, // sender address
        to: recipientEmail, // list of receivers
        subject: '[PrestaShop][Test] Bilan de tests - '+day+' ]', // Subject line
        html: 'Bonjour,</br>' +
        "<br> Les résultats de l'exécution des tests automatisés (Node.js) sur le navigateur (" +optionsBrowserNew.browser()+") sont en pièce jointe.</br> " +
        '<br>Bien à vous,</br>'+
        '<br>Equipe QA</br>', // html body
        attachments: [
            {
                path: "email_sender/rapport_test_"+version[1]+".html" // stream this file,
            }
        ]
    });
}
console.log("Email successfully sent!")

