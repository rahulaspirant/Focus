function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('WebAppBoot');
}

function AddRecord(firstname, lastname, street, city, state, zip, email) {
  var url = 'https://docs.google.com/spreadsheets/d/1oGtfVMXYvlmFXUp78JtWLPFUfX5BZ7HBdv87O7JyVac/edit?gid=0#gid=0';  //Paste URL of GOOGLE SHEET
  var ss= SpreadsheetApp.openByUrl(url);
  var webAppSheet = ss.getSheetByName("FORM DATA");
  webAppSheet.appendRow([firstname, lastname, street, city, state, zip, email, new Date()]);
  
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

<!DOCTYPE html>
<html>
  <head>
    <!-- Setting the base target for hyperlinks in the document -->
    <base target="_top">
    <!-- Linking to Bootstrap for styling the form -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    
    <!-- JavaScript function to add a row by collecting user input -->
    <script>
    function AddRow() {
      // Retrieving values entered in the form fields
      var firstname = document.getElementById("firstname").value;
      var lastname = document.getElementById("lastname").value;
      var street = document.getElementById("street").value;
      var city = document.getElementById("city").value;
      var state = document.getElementById("state").value;
      var zip = document.getElementById("zip").value;
      var email = document.getElementById("email").value;
      
      // Checking if all fields are filled before submission
      if(firstname != '' && lastname != '' && street != '' && city != '' && state != '' && zip != '' && email != '') {
        // If all fields are filled, run the Google Apps Script function to add the record
        google.script.run.AddRecord(firstname, lastname, street, city, state, zip, email);
        
        // Resetting the form fields after submission
        document.getElementById("firstname").value = '';
        document.getElementById("lastname").value = '';
        document.getElementById("street").value = '';
        document.getElementById("city").value = '';
        document.getElementById("state").value = '';
        document.getElementById("zip").value = '';
        document.getElementById("email").value = '';
        
        // Clearing any error messages displayed earlier
        document.getElementById("display_error").innerHTML = "";
      } else {
        // If any field is left empty, show an error message
        document.getElementById("display_error").innerHTML = "Please Enter All Information!";
      }
    }
    </script>
  </head>
  
  <body>
  <div style="padding: 10px;">
    <!-- Form for collecting user details -->
    <form>
      <!-- Row for first and last name fields -->
      <div class="form-row">
        <div class="form-group col-md-3">
          <label for="firstname">First Name</label>
          <!-- Input for first name -->
          <input type="text" id="firstname" class="form-control" />
        </div>
        <div class="form-group col-md-3">
          <label for="lastname">Last Name</label>
          <!-- Input for last name -->
          <input type="text" id="lastname" class="form-control" />
        </div>
      </div>
      
      <!-- Row for street address field -->
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="street">Street</label>
          <!-- Input for street address -->
          <input type="text" id="street" class="form-control" />
        </div>
      </div>
      
      <!-- Row for city, state, and zip fields -->
      <div class="form-row">
        <div class="form-group col-md-3">
          <label for="city">City</label>
          <!-- Input for city -->
          <input type="text" id="city" class="form-control" />
        </div>
        <div class="form-group col-md-2">
          <label for="state">State</label>
          <!-- Input for state -->
          <input type="text" id="state" class="form-control" />
        </div>
        <div class="form-group col-md-1">
          <label for="zip">Zip</label>
          <!-- Input for zip code -->
          <input type="text" id="zip" class="form-control" />
        </div>
      </div>
      
      <!-- Row for email field -->
      <div class="form-row">
        <div class="form-group col-md-3">
          <label for="email">Email</label>
          <!-- Input for email -->
          <input type="text" id="email" class="form-control" />
        </div>
      </div>
      
      <!-- Submit button to call the AddRow function -->
      <div class="form-group col-md-3">
        <input type="button" value="Submit" class="btn btn-primary" onclick="AddRow()" />
        <!-- Display error messages in this div -->
        <div id="display_error" style="color: red"></div>
      </div>
    </form>
  </div>
  </body>
</html>
