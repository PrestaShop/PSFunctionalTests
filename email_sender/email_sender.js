'use strict';
// create reusable transporter object using the default SMTP transport
var nodemailer = require('nodemailer');
var datetime = new Date();

// get travis env variable
var gmailname   = process.env.Gmail_name;
var gmailpass   = process.env.Gmail_password;
var email_cible = process.env.email_cible;

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: gmailname,
        pass: gmailpass
    }
});

console.log('Sending Email .....');

transporter.sendMail({
    from: gmailname, // sender address
    to: email_cible, // list of receivers
    subject: '[ Rapport FunctionalTests '+datetime+' ] ✔ ', // Subject line
    text: 'Bonjour', // plain text body
    html: 'Bonjour,' +
    ' Vous trouvez ci-joint le rapport de la FunctionalTests .' +
    ' cordialement </b>', // html body
    attachments: [
        {
            path: 'rapport_test.html' // stream this file,
        }
    ]
});