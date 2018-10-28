const express = require('express');
const http    = require('http');

// const fs = require('fs');
// const readline = require('readline');
// const {google} = require('googleapis');

//const express = require('express');
const router  = express.Router();

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = 'token.json';

const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

const app = express();
const port = 5000;

// const index = require('./index')
//     app.use(index);
//app.use(index);
// app.use('/',(req, res, next) => {
//     console.log('you are in server.js');
//     next();
// });


// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Sheets API.
    authorize(JSON.parse(content), listMajors);
  });
  
  /**
   * Create an OAuth2 client with the given credentials, and then execute the
   * given callback function.
   * @param {Object} credentials The authorization client credentials.
   * @param {function} callback The callback to call with the authorized client.
   */
   function authorize(credentials, callback) {
    console.log(`Autharizing with User Credentials:`)
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
  
  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
   * @param {getEventsCallback} callback The callback for the authorized client.
   */
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
  
  /**
   * Prints the names and majors of students in a sample spreadsheet:
   * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
   * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
   */
//    function listMajors(auth) {
//     const sheets = google.sheets({version: 'v4', auth});
//     sheets.spreadsheets.values.get({
//       spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',    //1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
//       range: 'Class Data!A1:H10',
//       valueRenderOption: 'FORMATTED_VALUE',
//       //range: 'Sheet1'   //1m48qn4l172z3hBBJEE9JnnFI43eIyoeBT_Qi5oM34ME
//     }, (err, res) => {
//       if (err) return console.log('The API returned an error: ' + err);
//       const rows = res.data.values;
      
//       if (rows.length) {
//         console.log('Name, Major:');
//         // Print columns A and E, which correspond to indices 0 and 4.
//         const xyz = rows.map((row) => {
//           //console.log(`${row[0]}, ${row[1]}, ${row[2]}, ${row[3]}, ${row[4]}`);
//           return {studentName: row[0],
//             gender: row[1],
//             classLevel: row[2],
//             homeState: row[3],
//             major: row[4],
//             extraActivity: row[5]
//           };
//         });
//         //mailer(rows[0]);
//         console.log(rows,xyz);
//         const qwe = JSON.stringify(xyz);
//          //'use strict';
//         const nodemailer = require('nodemailer');
  
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   nodemailer.createTestAccount((err, account) => {
//       // create reusable transporter object using the default SMTP transport
//       let transporter = nodemailer.createTransport({
//           // host: 'smtp.ethereal.email',
//           // port: 587,
//           // secure: false, // true for 465, false for other ports
//           // auth: {
//           //     user: account.user, // generated ethereal user
//           //     pass: account.pass // generated ethereal password
//           // }
  
//           // host: "smtp.gmail.com",
//           // port: 465,
//           // secure: true, // true for 465, false for other ports
//           // user: "ip.businessfirst@gmail.com",
//           // pass: "Nicpunjab@123"
//           service: 'gmail',
//           auth: {
//           user: 'amitykaran74@gmail.com',
//           pass: 'AmitYadav@1012'
//       }
//       });
  
//       // setup email data with unicode symbols
//       let mailOptions = {
//           from: 'amitykaran74@gmail.com', // sender address
//           to: 'amitykaran74@gmail.com', // list of receivers vpnydv10year@gmail.com
//           subject: 'Testing Mail', // Subject line
//           text: 'Hi, This is system generated mail. so dont panic, consult <amit yadav> for any problem.\n'+ 'Here is your data:'+qwe +'', // plain text body
//           //html: '<b>Hello world?</b>' // html body
//       };
  
//       // send mail with defined transport object
//       transporter.sendMail(mailOptions, (error, info) => {
//           if (error) {
//               return console.log(error);
//           }
//           console.log('Message sent: %s', info.messageId);
//           // Preview only available when sending through an Ethereal account
//           console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
//           // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//           // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//       });
//   });
//       } else {
//         console.log('No data found.');
//       }
//     });
//   }

function listMajors(auth) {
    var schedule = require('node-schedule');
 
    var j = schedule.scheduleJob('5 * * * * *', () => {
        console.log('this is from node scheduler');
        const sheets = google.sheets({version: 'v4', auth});
        sheets.spreadsheets.values.get({
          spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',    //1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
          range: 'Class Data!A1:H10',
          valueRenderOption: 'FORMATTED_VALUE',
          //range: 'Sheet1'   //1m48qn4l172z3hBBJEE9JnnFI43eIyoeBT_Qi5oM34ME
        }, (err, res) => {
          if (err) return console.log('The API returned an error: ' + err);
          const rows = res.data.values;
          
          if (rows.length) {
            console.log('Name, Major:');
            // Print columns A and E, which correspond to indices 0 and 4.
            const xyz = rows.map((row) => {
              //console.log(`${row[0]}, ${row[1]}, ${row[2]}, ${row[3]}, ${row[4]}`);
              return {studentName: row[0],
                gender: row[1],
                classLevel: row[2],
                homeState: row[3],
                major: row[4],
                extraActivity: row[5]
              };
            });
            //mailer(rows[0]);
            console.log(rows,xyz);
            const qwe = JSON.stringify(xyz);
             //'use strict';
            const nodemailer = require('nodemailer');
      
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      nodemailer.createTestAccount((err, account) => {
          // create reusable transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport({
              // host: 'smtp.ethereal.email',
              // port: 587,
              // secure: false, // true for 465, false for other ports
              // auth: {
              //     user: account.user, // generated ethereal user
              //     pass: account.pass // generated ethereal password
              // }
      
              // host: "smtp.gmail.com",
              // port: 465,
              // secure: true, // true for 465, false for other ports
              // user: "ip.businessfirst@gmail.com",
              // pass: "Nicpunjab@123"
              service: 'gmail',
              auth: {
              user: 'amitykaran74@gmail.com',
              pass: 'AmitYadav@1012'
          }
          });
      
          // setup email data with unicode symbols
          let mailOptions = {
              from: 'amitykaran74@gmail.com', // sender address
              to: 'vpnydv10year@gmail.com', // list of receivers vpnydv10year@gmail.com
              subject: 'Testing Mail', // Subject line
              text: 'Hi, This is system generated mail. so dont panic, consult <amit yadav> for any problem.\n'+ 'Here is your data:'+qwe +'', // plain text body
              //html: '<b>Hello world?</b>' // html body
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



app.use((req, res, next) => {
    res.json({success: true, msg: 'This is your response'});
});

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});
