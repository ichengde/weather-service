
const nodemailer = require('nodemailer');
const env = require('./env.js');

let transporter = nodemailer.createTransport(env.account);


module.exports = function (content) {
    let mailOptions = {
        from: '"weather" ' + env.account.auth.user, // sender address
        to: env.to, // list of receivers
        subject: content, // Subject line
        text: content, // plain text body
        html: content // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log(content);
    });
}