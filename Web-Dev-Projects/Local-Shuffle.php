// Local Shuffle PHP
<?php
session_start();
$host = $_SERVER["HTTP_HOST"];
$path = rtrim(dirname($_SERVER["PHP_SELF"]), "/\\");
header("Location: http://$host$path/Local-Shuffle.php");
exit;

// for info on what i did there look back at lecture 2 php continued at 1:22
$my_dir = ""
$my_file = ""
 ?>
