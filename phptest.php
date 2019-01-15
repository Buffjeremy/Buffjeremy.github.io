<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>

    <form action = "/submitgoeshere.php" method="post">
      <input type = "text" name="userInput"> </input>
      <input type = "submit"> submit here </input>
      <input type = "text" name="secondInput"> </input>
      <input type= "radio" name ="radioButton" Test Button> </input>
  </form>
    <?php $php = "PHP";
    echo "<h1> I love $php </h1>";
    print "<h1> $php is awesome </h1>";
    //echo $_SERVER['HTTP_USER_AGENT'];
    echo $_SERVER['PHP_SELF'];
    echo $_SERVER['SCRIPT_FILENAME'];
    ?>
  </body>
</html>
