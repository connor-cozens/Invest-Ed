const express = require("express")
const contact = express.Router()
const cors = require('cors')
var nodemailer = require('nodemailer')

contact.use(cors())

contact.post('/submit-form', (req,res) => {
    
    var transporter = nodemailer.createTransport({
        service: 'smtp.gmail.com',
        port: 465, //specific to gmail,
        secure: true,
        auth: {
            user: 'the email',
            pass: 'the password'
        }
    })
    
    var mailOptions = {
        from: 'the invest email',
        to: 'RAs email1, email2',
        subject: 'Contact Form@Invest-Ed',
        text: `${req.body.firstName} ${req.body.lastName} (${req.body.email}) from ${req.body.organization} says: ${req.body.message}`
    }

     transporter.sendMail(mailOptions, function(error, info){
        if(error){
            res.json({"error" : true,"message" : "Email not sent successfully"})
        }else{
            res.json({"error" : false,"message" : "Email sent successfully"})
        }
    })

   
})

module.exports = contact
