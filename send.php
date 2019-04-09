<?php

$usrtel = $_POST['usrtel'];
$usrname = $_POST['usrname'];
$commentary = $_POST['commentary'];

$usrtel = htmlspecialchars($usrtel);
$usrname = htmlspecialchars($usrname);
$commentary = htmlspecialchars($commentary);

$usrtel = urldecode($usrtel);
$usrname = urldecode($usrname);
$commentary = urldecode($commentary);

$usrtel = trim($usrtel);
$usrname = trim($usrname);
$commentary = trim($commentary);

echo $usrtel;
echo "<br>";
echo $usrname;
echo "<br>";
echo $commentary;