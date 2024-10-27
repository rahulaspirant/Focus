function updateRowsByUniqueID() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var formSheet = ss.getSheetByName("Form");
  var dataSheet = ss.getSheetByName("Data");
  
  // Get headers from both sheets
  var formHeaders = formSheet.getRange(1, 1, 1, formSheet.getLastColumn()).getValues()[0];
  var dataHeaders = dataSheet.getRange(1, 1, 1, dataSheet.getLastColumn()).getValues()[0];
  
  // Get data from both sheets
  var formData = formSheet.getDataRange().getValues();
  var data = dataSheet.getDataRange().getValues();
  
  // Find the index of the "UniqueID" column in both sheets
  var formUniqueIDCol = formHeaders.indexOf("UniqueID");
  var dataUniqueIDCol = dataHeaders.indexOf("UniqueID");
  
  if (formUniqueIDCol === -1 || dataUniqueIDCol === -1) {
    throw new Error("Column 'UniqueID' not found in one of the sheets.");
  }

  // Create a lookup object for the form data based on UniqueID
  var formDataLookup = {};
  for (var i = 1; i < formData.length; i++) {
    var row = formData[i];
    var uniqueID = row[formUniqueIDCol];
    formDataLookup[uniqueID] = row;
  }
  
  // Iterate through Data sheet and update rows where UniqueID matches
  var updates = [];
  for (var j = 1; j < data.length; j++) {
    var dataRow = data[j];
    var uniqueID = dataRow[dataUniqueIDCol];
    
    if (formDataLookup[uniqueID]) {
      var formRow = formDataLookup[uniqueID];
      var updatedRow = dataRow.slice();  // Create a copy of the data row
      
      // Map Form row data to Data sheet column order
      dataHeaders.forEach(function(header, index) {
        var formColIndex = formHeaders.indexOf(header);
        if (formColIndex > -1) {
          updatedRow[index] = formRow[formColIndex];
        }
      });
      
      // Store the updated row values and the row number to update in Data sheet
      updates.push({ rowNumber: j + 1, values: updatedRow });
    }
  }
  
  // Write updates back to Data sheet
  updates.forEach(function(update) {
    dataSheet.getRange(update.rowNumber, 1, 1, update.values.length).setValues([update.values]);
  });
}


/////////////////////////////////////////////////////////////////////////

//Simplified version

function updateRowsByUniqueID() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var formSheet = ss.getSheetByName("Form");
  var dataSheet = ss.getSheetByName("Data");
  
  // Get headers and data from both sheets
  var formHeaders = formSheet.getRange(1, 1, 1, formSheet.getLastColumn()).getValues()[0];
  var dataHeaders = dataSheet.getRange(1, 1, 1, dataSheet.getLastColumn()).getValues()[0];
  var formData = formSheet.getDataRange().getValues();
  var data = dataSheet.getDataRange().getValues();
  
  // Find index of the "UniqueID" column
  var formUniqueIDIndex = formHeaders.indexOf("UniqueID");
  var dataUniqueIDIndex = dataHeaders.indexOf("UniqueID");
  
  if (formUniqueIDIndex === -1 || dataUniqueIDIndex === -1) {
    throw new Error("Column 'UniqueID' not found in one of the sheets.");
  }

  // Create a lookup object for the form data
  var formLookup = {};
  for (var i = 1; i < formData.length; i++) {
    var uniqueID = formData[i][formUniqueIDIndex];
    formLookup[uniqueID] = formData[i];
  }
  
  // Prepare updates for Data sheet
  var updates = [];
  for (var j = 1; j < data.length; j++) {
    var uniqueID = data[j][dataUniqueIDIndex];
    var formRow = formLookup[uniqueID];
    
    if (formRow) {
      var updatedRow = data[j].slice(); // Copy data row
      dataHeaders.forEach(function(header, index) {
        var formColIndex = formHeaders.indexOf(header);
        if (formColIndex > -1) {
          updatedRow[index] = formRow[formColIndex];
        }
      });
      updates.push({ rowNumber: j + 1, values: updatedRow });
    }
  }
  
  // Write updates back to Data sheet
  updates.forEach(function(update) {
    dataSheet.getRange(update.rowNumber, 1, 1, update.values.length).setValues([update.values]);
  });
}


