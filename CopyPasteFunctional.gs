/**
 * Function to Update Rows in "Data" Sheet Based on UniqueID from "Form" Sheet
 * Organized into Numbered Sections for Clarity
 */

function updateRowsByUniqueID() {
  // 1. Initialize Sheets and Validate
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var formSheet = ss.getSheetByName("Form");
  var dataSheet = ss.getSheetByName("Data");

  if (!formSheet || !dataSheet) {
    throw new Error("Either 'Form' or 'Data' sheet is missing!");
  }


  // 2. Fetch Headers and Data
  var formHeaders = getHeaders(formSheet);
  var dataHeaders = getHeaders(dataSheet);
  var formData = getData(formSheet);
  var data = getData(dataSheet);

  // 3. Find "UniqueID" Column Indices
  var formUniqueIDCol = getColumnIndex(formHeaders, "UniqueID");
  var dataUniqueIDCol = getColumnIndex(dataHeaders, "UniqueID");

  if (formUniqueIDCol === -1 || dataUniqueIDCol === -1) {
    throw new Error("Column 'UniqueID' not found in one of the sheets.");
  }

  // 4. Create Lookup Object for Form Data
  var formDataLookup = createLookup(formData, formUniqueIDCol);

  // 5. Prepare Updates for Data Sheet
  var updates = prepareUpdates(data, dataHeaders, formHeaders, formDataLookup, dataUniqueIDCol);

  // 6. Apply Updates to Data Sheet
  applyUpdates(dataSheet, updates);
}

/** 1. Get Headers from a Sheet */
function getHeaders(sheet) {
  return sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
}

/** 2. Get All Data from a Sheet */
function getData(sheet) {
  return sheet.getDataRange().getValues();
}

/** 3. Find Column Index for a Given Header */
function getColumnIndex(headers, columnName) {
  return headers.indexOf(columnName);
}

/** 4. Create a Lookup Object from Form Data Based on UniqueID */
function createLookup(data, uniqueIDCol) {
  var lookup = {};
  for (var i = 1; i < data.length; i++) { // Skip the header row
    var uniqueID = data[i][uniqueIDCol];
    lookup[uniqueID] = data[i];
  }
  return lookup;
}

/** 5. Prepare Updates for Data Sheet */
function prepareUpdates(data, dataHeaders, formHeaders, formDataLookup, dataUniqueIDCol) {
  var updates = [];
  for (var j = 1; j < data.length; j++) { // Skip the header row
    var dataRow = data[j];
    var uniqueID = dataRow[dataUniqueIDCol];
    var formRow = formDataLookup[uniqueID];

    if (formRow) {
      var updatedRow = dataRow.slice(); // Copy the current row

      // Map "Form" Data to "Data" Sheet Column Order
      dataHeaders.forEach(function(header, index) {
        var formColIndex = formHeaders.indexOf(header);
        if (formColIndex > -1) {
          updatedRow[index] = formRow[formColIndex];
        }
      });

      updates.push({ rowNumber: j + 1, values: updatedRow }); // Adjust for 1-based indexing
    }
  }
  return updates;
}

/** 6. Apply Updates to the Data Sheet */
function applyUpdates(sheet, updates) {
  updates.forEach(function(update) {
    sheet.getRange(update.rowNumber, 1, 1, update.values.length).setValues([update.values]);
  });
}
