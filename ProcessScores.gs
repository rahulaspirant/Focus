function processScores() {

//Sheet name "Scores". Column A header name "Score"

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Scores");

  // Step 1: Get headers and data
  var headers = getHeaders(sheet);
  var data = getData(sheet);

  // Step 2: Process data (add a grade column)
  var processedData = calculateGrades(data, headers.indexOf("Score"));

  // Step 3: Write updated data back to the sheet
  writeData(sheet, processedData, headers.length + 1, "Grade");
}

// Function 1: Get headers from the sheet
function getHeaders(sheet) {
  return sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
}

// Function 2: Get all data (excluding headers)
function getData(sheet) {
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
}

// Function 3: Calculate grades based on scores
function calculateGrades(data, scoreIndex) {
  return data.map(function(row) {
    var grade = getGrade(row[scoreIndex]);
    return row.concat(grade); // Add the grade to the row
  });
}

// Function 4: Get the grade based on score
function getGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

// Function 5: Write processed data back to the sheet
function writeData(sheet, data, columnNumber, columnName) {
  // Add column header for grades if not present
  sheet.getRange(1, columnNumber).setValue(columnName);

  // Write data to the sheet
  sheet.getRange(2, columnNumber, data.length, 1).setValues(
    data.map(function(row) {
      return [row[row.length - 1]]; // Extract the grade column
    })
  );
}
