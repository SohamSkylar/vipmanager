const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const ENV = require("../config.js");

//https://ethereal.email/create

let nodeConfig = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: ENV.EMAIL, // generated ethereal user
      pass: ENV.PASSWORD, // generated ethereal password
    }
}

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "Mailgen67",
        link: "https://mailgen.js/"
    }
})


const registerMail = async(req,res) => {
    const {username, userEmail, text, subject} = req.body;

    //Body of Email

    var email = {
        body: {
            name: username,
            intro: text || 'Testing of Mailer',
            outro: 'Outro Text'
        }   
    }

    var emailBody = MailGenerator.generate(email);
    
    let message = {
        from: ENV.EMAIL,
        to: userEmail,
        subject: subject || "Default Value",
        html: emailBody
    }
    
    transporter.sendMail(message)
    .then(()=>{
        return res.status(200).send({msg: 'You will recieve email from us...'})
    })
    .catch(error => res.status(500).send({error}))

}

module.exports = registerMail