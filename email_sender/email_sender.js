'use strict';
// create reusable transporter object using the default SMTP transport
var nodemailer = require('nodemailer');
var dateFormat = require('dateformat');

// get travis env variable
var Sender_Email   = process.env.Sender_Email;
var Sender_Email_password   = process.env.Sender_Email_password;
var Recipient_Email = process.env.Recipient_Email;

var Version = new Array();
Version = [1.6,1.7];

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: Sender_Email,
        pass: Sender_Email_password
    }
});

console.log('Sending Email .....');

var day=dateFormat( "yyyy-mm-dd h:MM:ss");



transporter.sendMail({
    from: Sender_Email, // sender address
    to: Recipient_Email, // list of receivers
    subject: '[PrestaShop][Test] Bilan de tests - '+day+' ]', // Subject line
    html: 'Bonjour,</br>' +
    '<br> Les résultats de l exécution des tests automatisés (Python & Node.js) lancés avec les navigateurs Chrome et Firefox sont en Pièce jointe .</br> ' +
    ' <br>cordialement</br>', // html body
    attachments: [
        {
            path: "email_sender/rapport_test_"+Version[0]+".html" // stream this file,
        },{
            filename:  "rapport_test_"+Version[1]+".html",
            path:  "email_sender/rapport_test_"+Version[1]+".html"
        }


    ]
});

