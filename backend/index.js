const express = require("express")
const cors = require("cors")
const mongoose =require("mongoose")
const app = express()
app.use(cors())

app.use(express.json())

const nodemailer = require("nodemailer");
mongoose.connect("mongodb://127.0.0.1:27017/passkey").then(function(){
    console.log("connected to DB")
}).catch(function(){console.log("Failed to connect")})

const credential = mongoose.model("credential",{},"bulkmail")






app.post("/sendemail",function(req,res){

    
var msg = req.body.msg
var emailList = req.body.emailList
credential.find().then(function(data){
    // Create a transporter using SMTP
const transporter = nodemailer.createTransport({

  service:"gmail", // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: data[0].toJSON().user,
    pass: data[0].toJSON().pass,
  },
});
new Promise(async function(resolve,reject){
try{
for(var i=0;i<emailList.length;i++)
    {
    await transporter.sendMail(
    {
        from:"sivabharathim033@gmail.com",
        to:emailList[i],
        subject:"A message from Bulk Mail App",
        text:msg
    },
 
)
console.log("Email sent to:"+emailList[i])
}
 resolve("success")
}
catch(error){
    reject("failed")
}
}).then(function(){
    res.send(true)
}).catch(function(){
    res.send(false)
})
    
}).catch(function(error){
    console.log(error)
})


})





app.listen(5001,function(){
    console.log("server started.....")
})

module.exports = app;