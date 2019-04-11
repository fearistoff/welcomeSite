<?php
$to = 'fearistoff713@gmail.com';
$subject = 'Request';
$usrtel = $_POST['usrtel'];
$usrname = $_POST['usrname'];
$commentary = $_POST['commentary'];

$usrtel = htmlspecialchars($usrtel);
$usrname = htmlspecialchars($usrname);

$usrtel = urldecode($usrtel);
$usrname = urldecode($usrname);


$usrtel = trim($usrtel);
$usrname = trim($usrname);

if ($commentary) {
    $commentary = htmlspecialchars($commentary);
    $commentary = urldecode($commentary);
    $commentary = trim($commentary);
    $message = 'Telephone number - ' . $usrtel . '<br>Name to contact - ' . $usrname . '<br>Commentary:<br>' . $commentary;
} else {
    $message = 'Telephone number - ' . $usrtel . '<br>Name to contact - ' . $usrname;
}

if (mail($to , $subject , $message)) {
    echo 'Success';
} else {
    echo 'Fail';
}