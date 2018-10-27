var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./credentials.json');
const 

// Create a document object using the ID of the spreadsheet - obtained from its URL.
var doc = new GoogleSpreadsheet('363630182034-vqt483ucmpqe4d8d556tq8289kcr8sqf');

doc.addRow(1, { last_name: 'Agnew', first_name: 'Samuel' }, function(err) {
  if(err) {
    console.log(err);
  }
});
// Authenticate with the Google Spreadsheets API.
doc.useServiceAccountAuth(creds, function (err) {

  // Get all of the rows from the spreadsheet.
  doc.getRows(1, function (err, rows) {
    console.log(rows);
  });
});

