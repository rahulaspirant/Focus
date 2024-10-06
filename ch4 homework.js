function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
      .setTitle('Chapter-4 Task')
      .setWidth(400)
      .setHeight(300);
}

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>js-ch-4-Homework</title>
    <style>
        .question1 {
            text-align: right; /* Aligns Q1 to the right */
        }
    </style>
</head>
<body> 
    
    <p id="result">Just for Code</p>
    <h1 class="question1">Q1. What is HTML?</h1>
    <button onclick="Right()">Hyper Text Markup Language</button>
    <button onclick="Wrong()">Hyper Text Markup Loading</button>
    
    <h1>Q2. What Does JFC Stand For?</h1>
    <button onclick="Right()">Just for Code</button>
    <button onclick="Wrong()">Just for Mode</button>

    <h1>Q3. What Does CSS Stand For?</h1>
    <button onclick="Right()">Cascading Style Sheets</button>
    <button onclick="Wrong()">Create Style Sheet</button>

    <script>
        function Right() {
            document.getElementById('result').innerText = "Right Answer!";
        }

        function Wrong() {
            document.getElementById('result').innerText = "Wrong Answer!";
        }
    </script>

</body>
</html>
