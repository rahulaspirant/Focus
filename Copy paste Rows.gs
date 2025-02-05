function updateRowsByUniqueID() {
  // Get the active spreadsheet and the specific sheets by name
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var Sourcesheet = spreadsheet.getSheetByName("Source"); // Sheet containing form responses
  var Targetsheet = spreadsheet.getSheetByName("Target"); // Sheet containing the main data

  // Get headers (first row) from both sheets
  var sourceHeaders = Sourcesheet.getRange(1, 1, 1, Sourcesheet.getLastColumn()).getValues()[0];
  var targetHeaders = Targetsheet.getRange(1, 1, 1, Targetsheet.getLastColumn()).getValues()[0];

  // Get all data from both sheets
  var sourceData = Sourcesheet.getDataRange().getValues(); // All form response data
  var targetData = Targetsheet.getDataRange().getValues(); // All data from the main sheet

  // Find the index of the "UniqueID" column in both sheets
  var sourceUniqueIDColumnIndex = sourceHeaders.indexOf("UniqueID"); // Column index in Source sheet
  var targetUniqueIDColumnIndex = targetHeaders.indexOf("UniqueID"); // Column index in Target sheet

  // Throw an error if "UniqueID" column is not found in either sheet
  if (sourceUniqueIDColumnIndex === -1 || targetUniqueIDColumnIndex === -1) {
    throw new Error("Column 'UniqueID' not found in one of the sheets.");
  }

  // Create a lookup object for the source data, using UniqueID as the key
  var sourceLookup = {};
  for (var sourceRowIndex = 1; sourceRowIndex < sourceData.length; sourceRowIndex++) { // Start from row 2 to skip headers
    var sourceRow = sourceData[sourceRowIndex]; // Current row in Source sheet
    var uniqueID = sourceRow[sourceUniqueIDColumnIndex]; // UniqueID value in the current row
    sourceLookup[uniqueID] = sourceRow; // Store the row in the lookup object
  }

  // Iterate through the target data sheet and update rows where UniqueID matches
  var rowsToUpdate = []; // Array to store updates
  for (var targetRowIndex = 1; targetRowIndex < targetData.length; targetRowIndex++) { // Start from row 2 to skip headers
    var targetRow = targetData[targetRowIndex]; // Current row in target data sheet
    var uniqueID = targetRow[targetUniqueIDColumnIndex]; // UniqueID value in the current row

    // Check if the UniqueID exists in the source lookup
    if (sourceLookup[uniqueID]) {
      var matchingSourceRow = sourceLookup[uniqueID]; // Get the corresponding source row
      var updatedTargetRow = targetRow.slice(); // Create a copy of the target row to update

      // Map source row data to target sheet column order
      targetHeaders.forEach(function(header, targetColumnIndex) {
        var sourceColumnIndex = sourceHeaders.indexOf(header); // Find the column index in Source sheet
        if (sourceColumnIndex > -1) { // If the column exists in Source sheet
          updatedTargetRow[targetColumnIndex] = matchingSourceRow[sourceColumnIndex]; // Update the target row with source data
        }
      });

      // Store the updated row values and the row number to update in the target sheet
      rowsToUpdate.push({
        rowNumber: targetRowIndex + 1,
        values: updatedTargetRow
      });
    }
  }

  // Write updates back to the target sheet
  rowsToUpdate.forEach(function(update) {
    Targetsheet.getRange(update.rowNumber, 1, 1, update.values.length).setValues([update.values]);
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


