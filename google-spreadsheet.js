var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
 
// spreadsheet key is the long id in the sheets URL
//https://docs.google.com/spreadsheets/d/1m48qn4l172z3hBBJEE9JnnFI43eIyoeBT_Qi5oM34ME/edit#gid=1589716105
var doc = new GoogleSpreadsheet('1m48qn4l172z3hBBJEE9JnnFI43eIyoeBT_Qi5oM34ME');
var sheet = doc;
 //firstservice@assignment1-1540523251266.iam.gserviceaccount.com
////e0cff8578f8ef830a9b522e4a5cd8fdaa9a6ccad
async.series([
  function setAuth(step) {
    // see notes below for authentication instructions!
    //var creds = require('./credentials.json');
    // OR, if you cannot save the file locally (like on heroku)
    var creds_json = {
      client_email: 'firstservice@assignment1-1540523251266.iam.gserviceaccount.com',
      private_key: '-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQCYbBjILNxd+h5V\npn2R481w0VFeQNPpGJ2FjZDIuwCUtTPPcfPUliuUkpzf3kO/RgrqAXxBOjXMu+w2\ngyHFBBS3nxS+2ayMJcHVpXJojlfEo/zqXI8PrlQjoy7VRH1+zVk3H8/M9f0onstO\n6u0suFr/xsMWBl1+CA4mkk9mgthybgqD19cIdoDIgQdc/ZuTFG9pBgV8h4FvqQ15\nPXpDbsaLeuDqzRMC0OVLjT/PxJRScQ0Uf4cJIjaas3r+Bi38dCmGt1pyMWMarT3o\nGl8GL2bsxNO7Yk2GcVcCibxDdJfo9b4YIXnYM9WUJoNTx4pCtS2pcDVplGkkDIe2\nbgjnyPR9AgMBAAECgf8KHyOGJ3R6ySE6jtPH3FjIJR5CJAvubrQHKl9y9PgU5/OI\n0wheFZrPQu0n8JqPGRegcnjN3A+2iMQm2o5jhuHZT7cQ9WN/6wH0Lghq6QjrBfjF\nl1/oqqrrsuppPyMWSIykHHiwI6WsDN9zXiZh0dw5H/nUfJe4xtApv42GQSoebxYD\nFAc6EPMUcp+GpDMVQ9fKZul7dedunnApsRiBEMiBodqZ4NZ8uFULJ+zfCxCnM7lm\nG9dux7nwjJuNO2m9NLRxMalSPs0hJ666LKFR7QkNefImqxitsH0mzP+EQMQfLgFL\nKnDuivTqSBituJz2aUF/XEa0soIcFVfvrZx9mV0CgYEAzNC1igR3VZVo46PsMt6E\nisb+gtCy/YXqWkzr+iSXNKblWNHSykocims0qaXYnU1k/h2P/wmVyg19yydmXIEO\nZi/9xfG4tKWfnVeWaXRPXC4hAIlIi0WL2n0zO9RlDQMFCWEWLbAj6zcibQmZ5o/R\nodJMC/l6ANwRwtnq6cfcDbsCgYEAvoN8DC/ARx4NjYfoXcuvIAfAsZcpDQ8L8rHk\nMeAtmFbMV2hOBvuY9QYr4QxHRuLoQiagnfYvrQGHzG+gWXITyKOK2Alnxu4uk0dg\ndaeedHqy592OgMumuyafiraS0IxnRCzxLJG3PdHly5g4ThvvUPsJc7vL46h7eUWY\n/nccRycCgYEArsd0A8Fn7HrBtXDPQWGuDZde3VcnRz2eDU0TGrVa6y15DeCQVtwD\nmwN9P0Atp57CDjBAD02oq3Hz5QdMTKg9F2rgzqhGDLJBkU2LJ5Z/mpQqyYBdjavd\neqfYrrfDO+VVyPk2qepj3HeCQzYsRRp5s/P3vUg5mr4x0euQkctht70CgYAZgvHx\nj9NnspaOBU0Qgl4JJAChx2Qv43vuG/Q62ZJBfB4Q9l68gKSS6yilEkfZLjl74kBP\n5s+rkzDkJ26Ji8UqcPv+wgOrl+mUv1IjbzbA0k1yzzBt/tds6Fck9B3k32hUsM/6\n7+hh1uG2ycOAci0x4uv5G4TKD525N6CtMrYOsQKBgGA435+2Wy5aJsn8iKpQRX63\nQlZmZVEA59EzTf9YOT/z8MVAgIRSF/Ba6Gc9Wo6GvU9NKoCb+g6wVIyTgk/1CTfh\nnEQEa9KipEO7W9Zh5LhPlZD0Wqp3DgVyuGNpcE58dmk1cdhk/x0wZlHAtqvFQjmS\njLUjRg+vqL+lAwf+fLnd\n-----END PRIVATE KEY-----\n'
    }
 
    doc.useServiceAccountAuth(creds_json, step);
  },
  function getInfoAndWorksheets(step) {
    //doc.isAuthActive( asd => console.log(asd));
   
	console.log('docs', doc);

	  doc.getRows(1, function (err, rows) {
    console.log('total rows',rows);
  });

//   doc.spreadsheets.values.get({
//     spreadsheetId: '1m48qn4l172z3hBBJEE9JnnFI43eIyoeBT_Qi5oM34ME',
//     range: 'Form Responses 1!A2:E',
//   }, (err, res) => {
//     if (err) return console.log('The API returned an error:  amt' + err);
//     const rows = res.data.values;
//     if (rows.length) {
// console.log(rows);
//       console.log('Name, Major:');
//       // Print columns A and E, which correspond to indices 0 and 4.
//       rows.map((row) => {
//         console.log(`${row[0]}, ${row[4]}`);
//       });
//     } else {
//       console.log('No data found.');
//     }
//   });


    doc.getInfo(function(err, info) {
  console.log('info', info);
  const xyz = info.worksheets[0]  ;
  console.log(xyz)
  xyz.getRows((err, asd) => {
    console.log(asd);
  });
      //console.log('Loaded doc: '+info.title+' by '+info.author.email);
      sheet = info.worksheets[0];
      console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
      step();
    });
  },




  // function listMajors(auth) {
  //   const sheets = google.sheets({version: 'v4', auth});
  //   sheets.spreadsheets.values.get({
  //     spreadsheetId: '1m48qn4l172z3hBBJEE9JnnFI43eIyoeBT_Qi5oM34ME',
  //     range: 'Form Responses 1!A2:E',
  //   }, (err, res) => {
  //     if (err) return console.log('The API returned an error:  amt' + err);
  //     const rows = res.data.values;
  //     if (rows.length) {
  // console.log(rows);
  //       console.log('Name, Major:');
  //       // Print columns A and E, which correspond to indices 0 and 4.
  //       rows.map((row) => {
  //         console.log(`${row[0]}, ${row[4]}`);
  //       });
  //     } else {
  //       console.log('No data found.');
  //     }
  //   });
  //   step();
  // },



  function workingWithRows(step) {
    // google provides some query options
	console.log('steps',step);
    sheet.getRows({
      //offset: 1,
      limit:5,
      orderby: 'enquirynum'
    }, function( err, rows ){
      //console.log('Read '+rows.length+' rows');
      // const qwert = rows.JSON();
      // console.log('qwert', qwert);
	console.log('sheet', sheet);
 	console.log('rows', rows);
      // the row is an object with keys set by the column headers
      //rows[0].colname = 'new val';
      ////rows[0].save(); // this is async
 
      // deleting a row
      //rows[0].del();  // this is async
 
      step();
    });
  },
  function workingWithCells(step) {
    sheet.getCells({
      'min-row': 1,
      'max-row': 5,
      'return-empty': true
    }, function(err, cells) {
      var cell = cells[0];
      //console.log('Cell R'+cell.row+'C'+cell.col+' = '+cell.value);
 
      // cells have a value, numericValue, and formula
      cell.value == '1'
      cell.numericValue == 1;
      cell.formula == '=ROW()';
 
      // updating `value` is "smart" and generally handles things for you
      cell.value = 123;
      cell.value = '=A1+B2'
      cell.save(); //async
 
      // bulk updates make it easy to update many cells at once
      cells[0].value = 1;
      cells[1].value = 2;
      cells[2].formula = '=A1+B1';
      sheet.bulkUpdateCells(cells); //async
 
      step();
    });
  },
  function managingSheets(step) {
    doc.addWorksheet({
      title: 'my new sheet'
    }, function(err, sheet) {
 
      // change a sheet's title
      sheet.setTitle('new title'); //async
 
      //resize a sheet
      sheet.resize({rowCount: 50, colCount: 20}); //async
 
      sheet.setHeaderRow(['name', 'age', 'phone']); //async
 
      // removing a worksheet
      sheet.del(); //async
 
      step();
    });
  }
], function(err){
    if( err ) {
      console.log('Error: '+err);
    }
});
