const nodemailer = require("nodemailer");

const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

async function sendMail({to,subject,text}){
    const mailOptions={
        from:"RentEase <no-reply@rentease.com>",
        to,
        subject,
        text
    };
    return new Promise((resolve,reject)=>{
        mailTransporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                return error
            }

            return resolve(info)
        })
    }).then("send to the user").catch("error occurred here ")
}


module.exports=sendMail