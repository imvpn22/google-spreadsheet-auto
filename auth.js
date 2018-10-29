module.exports.transporter_credentials = {
  service: 'gmail',  // Name of the mail service
  auth: {
    user: 'vpnydv123@gmail.com', // place your@mail here
    pass: '<Your password here>'  // your password
  }
};

module.exports.spreadsheet_credentials  = {
  // 1m48qn4l172z3hBBJEE9JnnFI43eIyoeBT_Qi5oM34ME
  spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms', // ID of Google Spreadsheet
  valueRenderOption: 'FORMATTED_VALUE',
  // changes range according to your need
  // range: 'events!A2:K200'
  range: 'Class Data!A1:F6'
};

// setup email data with unicode symbols
module.exports.mailOptions  = {
  from: 'vpnydv123@gmail.com', // sender address
  to: 'vpnydv10year@gmail.com', // list of receivers
  subject: 'Testing Mail', // Subject line
  text: `Hi,\n This is Vipin Yadav.
    You got this mail because you have choosed our service
    for taking dump from your "Google Sheets" and send it
    to you on a interval.

    Please find the data file in attachments.

    \nRegards \nVipin Yadav`,
  attachments: [{
    filename: 'data.json',
    path: './data.json'
  }]
};
