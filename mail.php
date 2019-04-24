<?php

$method = $_SERVER['REQUEST_METHOD'];

//Script Foreach
$c = true;

$admin_email  = trim($_POST["admin_email"]);
$form_subject = trim($_POST["form_subject"]);
	
if ( $method === 'POST' ) {
	foreach ( $_POST as $key => $value ) {
		if ( $value != "" && $key != "admin_email" && $key != "form_subject" ) {
			$message .= "<strong>$key </strong> $value <br>";
		}
	}
} else if ( $method === 'GET' ) {
	foreach ( $_GET as $key => $value ) {
		if ( $value != "" && $key != "admin_email" && $key != "form_subject" ) {
			$message .= "<strong>$key </strong> $value";
		}
	}
}

//$message = "<table style='width: 100%;'>$message</table>";

function adopt($text) {
	return '=?UTF-8?B?'.Base64_encode($text).'?=';
}

$headers = "MIME-Version: 1.0\r\n".
   "Content-type: text/html; charset=utf-8\r\n".
   "Return-Path: adminemail@yahoo.com";

mail($admin_email, adopt($form_subject), $message, $headers );
