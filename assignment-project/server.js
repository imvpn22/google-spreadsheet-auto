'use strict';

const express = require('express');
const http    = require('http');
const router  = express.Router();
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const schedule = require('node-schedule');
const nodemailer = require('nodemailer');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = 'token.json';

const app = express();
const port = 5000;

// fs.open('./data.txt', (err, fd) => {
//   if(err){
//     console.log(`Error:${err}`);
//   } else {
//     console.log('file is created!');
//   }
// });

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  authorize(JSON.parse(content), listMajors);
});

function authorize(credentials, callback) {
  console.log(`Authorizing with User Credentials:`)
  // console.log(credentials);
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) console.error(err);
          console.log('Token stored to', TOKEN_PATH);
        });
        callback(oAuth2Client);
      });
  });
}

function listMajors(auth) {
  //send mail after every minute:5 second 
  var j = schedule.scheduleJob('5 * * * * *', () => {
    console.log('this is from node scheduler');
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
          spreadsheetId: '1m48qn4l172z3hBBJEE9JnnFI43eIyoeBT_Qi5oM34ME',    //1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
          //range: 'Class Data!A1:G4',
          valueRenderOption: 'FORMATTED_VALUE',
          range: 'events!A2:K240'   //1m48qn4l172z3hBBJEE9JnnFI43eIyoeBT_Qi5oM34ME
        }, (err, res) => {
          if (err) return console.log('The API returned an error: ' + err);
          const rows = res.data.values;

          if (rows.length) {
            console.log('Name, Major:');
            // Print columns A and E, which correspond to indices 0 and 4.
            const xyz = rows.map((row) => {
              //console.log(`${row[0]}, ${row[1]}, ${row[2]}, ${row[3]}, ${row[4]}`);
              return {Id: row[0],
                date: row[1],
                event: row[2],
                occasion: row[3],
                venuetype: row[4],
                packagetype: row[5],
                city: row[6],
                guests: row[7],
                status: row[8],
                quality: row[9],
                budget:row[10]
              };
            });
            //mailer(rows[0]);
            console.log(rows,xyz);
            const qwe = JSON.stringify(xyz);

            fs.writeFile('data.txt', qwe, function(err, data){
              if (err) {
                console.log(err);
              } else{
                console.log("Successfully Written to File :", data);
              }
          });

      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      nodemailer.createTestAccount((err, account) => {
          // create reusable transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport({             
              service: 'gmail',
              auth: {
                user: 'amitykaran74@gmail.com',
                pass: 'amit@1012yadav'
              }
            });

          // setup email data with unicode symbols
          let mailOptions = {
              from: 'amitykaran74@gmail.com', // sender address
              to: 'amitykaran74@gmail.com', // list of receivers vpnydv10year@gmail.com
              subject: 'Testing Mail', // Subject line
              text: 'Hi,\n This is Amit Yadav. As you give me the assignment in which i have to do just access the data from "google sheets" and send it by mail on a interval. I completed the given task as per instruction, if you want some improvement or changes just tell me. \nRegards \nAmit Yadav', // plain text body
              attachments: [
                {   
                  filename: 'mydata.txt',
                  path: './data.txt' // stream this file
              },
              ]
            };

          // send mail with defined transport object
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
              // Preview only available when sending through an Ethereal account
              console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

              // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
              // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });
        });
    } else {
      console.log('No data found.');
    }
  });
  });
}
