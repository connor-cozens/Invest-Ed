const express = require("express")
const contact = express.Router()
const cors = require('cors')
var nodemailer = require('nodemailer')

contact.use(cors())

contact.post('/email', (req,res) => {
    
    var transporter = nodemailer.createTransport({
        /*service:"Hotmail",
        auth: {
            user: "",
            pass: ""
        }*/
        //The Hotmail service was used in testing. I couldn't connect to Gmail working locally
        service: 'smtp.gmail.com',
        port: 465, //specific to gmail,
        secure: true,
        auth: {
            user: 'dataviz.invested@gmail.com',
            pass: ''
        }
    })
    
    var mailOptions;

    if (req.body.firstName != null){
        mailOptions = {
            from: 'dataviz.invested@gmail.com',
            to: 'dataviz.invested@gmail.com',
            subject: `${req.body.emailSubject}`,
            text: `${req.body.firstName} ${req.body.lastName} (${req.body.senderEmail}) from ${req.body.organization} says: ${req.body.emailBody}`
        }
    }
    else{
        mailOptions = {
            from: 'dataviz.invested@gmail.com',
            to: 'dataviz.invested@gmail.com',
            subject: `${req.body.emailSubject}`,
            text: `An unregistered user with email address (${req.body.senderEmail}) says: ${req.body.emailBody}`
        }
    }

    

     transporter.sendMail(mailOptions, function(error, info){
         console.log("EMAIL");
        if(error){
            res.json({"error" : true,"message" : "Email not sent successfully"})
            console.log(error);
        }else{
            res.json({"error" : false,"message" : "Email sent successfully"})
        }
    })

   
})

module.exports = contact
