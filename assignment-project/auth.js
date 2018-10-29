module.exports.transporter_credentials = {             
    service: 'gmail',
    auth: {
      user: 'yourmail@gmail.com', // place your@mail here
      pass: 'your@gmailpassword'  // your@password
    }
  };

module.exports.spreadsheet_credentials  = {
    spreadsheetId: '1m48qn4l172z3hBBJEE9JnnFI43eIyoeBT_Qi5oM34ME',    //1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
    //range: 'Class Data!A1:G4',
    valueRenderOption: 'FORMATTED_VALUE',
    // changes range according to your need
    range: 'events!A2:K200'   //1m48qn4l172z3hBBJEE9JnnFI43eIyoeBT_Qi5oM34ME
  }  

          // setup email data with unicode symbols
module.exports.mailOptions  = {
  from: 'amitykaran74@gmail.com', // sender address
  to: 'amitykaran74@gmail.com', // list of receivers
  subject: 'Testing Mail', // Subject line
  text: `Hi,\n This is Amit Yadav. 
  You got this mail because you give me the assignment in which i have to do 
  just access the data from "google sheets" and send it by mail on a interval.
   I completed the given task as per instruction, if you want some improvement 
   or changes just let me know. \nRegards \nAmit Yadav`, // plain text body
  attachments: [
    {   
      filename: 'mydata.txt',
      path: './data.txt' // stream this file
  },
  ]
};  