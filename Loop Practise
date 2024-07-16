function forLoopEx() {

let sht = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Dataset");
let rng = sht.getRange("A2:F5").getValues();

let result = []; 
for(var x=0; x<rng.length; x++){
result.push(rng[x][5]);  
}
Logger.log(result.join("\n"));

}



function forLoopExchatgpt() {
  let sht = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Dataset");
  let rng = sht.getRange("A2:E5").getValues();

  let results = rng.map(row => row[5]); // Use map to create a new array with the first column values

  Logger.log(results.join("\n")); // Log the final results outside the loop
}
