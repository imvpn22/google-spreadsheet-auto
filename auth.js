module.exports.transporter_credentials = {
    service: 'gmail',
    auth: {
      user: 'vpnydv123@gmail.com', // place your@mail here
      pass: ''  // your@password
    }
  };

module.exports.spreadsheet_credentials  = {
    // 1m48qn4l172z3hBBJEE9JnnFI43eIyoeBT_Qi5oM34ME
    spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',    //1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
    valueRenderOption: 'FORMATTED_VALUE',
    // changes range according to your need
    // range: 'events!A2:K200'
    range: 'Class Data!A1:G4'
  }

          // setup email data with unicode symbols
module.exports.mailOptions  = {
  from: 'vpnydv123@gmail.com', // sender address
  to: 'vpnydv10year@gmail.com', // list of receivers
  subject: 'Testing Mail', // Subject line
  text: `Hi,\n This is Vipin Yadav.
  You got this mail because you give me the assignment in which i have to do
  just access the data from "google sheets" and send it by mail on a interval.
   I completed the given task as per instruction, if you want some improvement
   or changes just let me know. \nRegards \nVipin Yadav`, // plain text body
  attachments: [
    {
      filename: 'data.json',
      path: './data.json' // stream this file
  },
  ]
};