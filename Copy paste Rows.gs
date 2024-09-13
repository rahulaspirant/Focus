function copyNewRows() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var formSheet = ss.getSheetByName("Form");
  var dataSheet = ss.getSheetByName("Data");
  var formData = formSheet.getDataRange().getValues();
  var data = dataSheet.getDataRange().getValues();
  var headers = formRange(1, 1, 1, formSheet.getLastColumn()).getValues();
  var uniqueIDCol = headers.indexOf("UniqueID"); // Replace "UniqueID" with your actual column name
  var newData = [];

  // Get existing IDs in Data sheet
  var existingIDs = data.map(row => row[uniqueIDCol]);

  // Iterate through Form data and filter out existing IDs
  for (var i = 1; i < formData.length; i++) {
    if (!existingIDs.includes(formData[i][uniqueIDCol])) {
      newData.push(formData[i]);
    }
  }

  // Append new data to Data sheet
  if (newData.length > 0) {
    dataSheet.getRange(dataSheet.getLastRow() + 1, 1, newData.length, newData.length).setValues(newData);
  }
}
