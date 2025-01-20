const nodemailer = require('nodemailer'); // Import nodemailer library
const express = require('express');
const app = express();
const port = 3000;

const path = require("path");
app.use(express.static("static_files"));

const cors = require("cors");
app.use(cors());

// Create transporter between this script file and gmail server
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'xchicax58@gmail.com', // sender, using my alteranate nonserious email account
    pass: 'kyxmaaflikwijyfg', // unique password generated from google
  }

  //dotenv doesnt work for me, no encryption for user/pass
});

// to allow access to all the responses from the form in register page
const bodyParser = require("express");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// get responses from the register
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./static_files/RegisterPage.html"));
})

app.listen(port, () => {
  console.log(`Server running at http://localHost:${port} `);
});

app.post("/sendmail", (req, res) => {

  const emailrecipient = req.body;
  console.log(emailrecipient);

  // Define variables in the scope of for loop, outside of the loop, the variables wont exist
  for (var key in emailrecipient) {
    console.log(emailrecipient[key]);

    const htmlfileData = '<head><style>*{margin: 0;padding: 0;}body{justify-content: center; text-align: center;}div {display: flex;text-align: center;} img {height: auto;}</style></head><body><div><img src = "cid:Email.png"/></div></body>'
  
    const mailinfo = {
      to: emailrecipient[key],
      subject: "From AMoR with Love.",
      html: htmlfileData,
      attachments: [{
      filename: 'Email.png',
      path: './static_files/Images/Email.png',
      contentDisposition: 'inline',
      cid: 'Email.png',
      contentType: 'image/png' // send embedded image in email
      }]
    }

    // transporter to grant access to email server side
    transporter
    .sendMail(mailinfo) // send emails 
    .then(() => {
      res.sendFile(path.join(__dirname, "index.html"));
    })

    .catch((error) => {
      // returns error in the case email send function doesnt work
      console.log(error);
    })

    break; // run for loop once because im not built for several emails 
  }
})

// Unused email validation system
// function obtainUserEmail () {
//   var emailofuser = document.getElementById('email').value;

//   let answer = validateEmail(emailofuser);

//   if (answer === false) {
//       alert("Please enter a valid email.")
//   } else if (answer === true) {
//       alert("An email has been sent to your inbox!")
//   }
// }

// change first parameter to pass the recepient's address
// sendEmail("leewen.lumba@gmail.com");

// function validateEmail(email) {
//   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailPattern.test(email);
// }



// function sendEmail(to) {
//     

//     transporter.sendMail({
//       to: to,
//       subject: "From AMoR with Love.",
//       html: htmlfileData,
//       attachments: [{
//       filename: 'Email.png',
//       path: './static_files/Images/Email.png',
//       contentDisposition: 'inline',
//       cid: 'Email.png',
//         contentType: 'image/png'
//       }]
//     }
//   )
  // .then(() => {
  //   res.json({
  //     status: "SUCCESS",
  //     message: "Email sent."
  //   })
  // })
  // .catch((error) => {
  //   console.log(error);
  //   res.json({
  //     status: "FAILED",
  //     message: "An error has occured."});
  // })
//}

// Failed Tests for embedded images on HTML
//   // Configure the mailoptions object
//   const mailOptions = {
//     from: 'leewen.lumba@gmail.com',
//     to: 'leewen.lumba@gmail.com',
//     subject: 'Sending Email using Node.js',
//     text: 'That was easy!'
//   };
  
//   // Send the email
//   transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log('Error:', error);
//     } else {
//       console.log('Email sent:', info.response);
//     }
// });

// Create a transporter object
/*const transporter = nodemailer.createTransport({
  host: 'live.smtp.mailtrap.io',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: '1a2b3c4d5e6f7g',
    pass: '1a2b3c4d5e6f7g',
  }
});

// Configure the mailoptions object
const mailOptions = {
  from: 'leewen.lumba@gmail.com',
  to: 'leewen.lumba@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

// Send the email
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});


// Failed
// const nodeMailer = require('nodemailer');

// const html = "<h1>Hello World</h1>";

// async function main() {

//     const transporter = nodeMailer.createTransport({
//         host: 'mail.openjavascript.info',
//         port: 465,
//         secure: true,
//         auth: {
//             user: 'test@openjavascript.info',
//             pass: 'NodeMailer123!'
//         }

//     });

//     const info = await transporter.sendMail({

//         from: 'OpenJavaScript <test@openjavascript.info',
//         to: 'leewen.lumba@gmail.com',
//         subject: "TEEST",
//         html: html,
//     })

//     console.log("Message sent: " + info.messageId);

// }

// main();
// this.catch(e => console.log(e)); */