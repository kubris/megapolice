<?php

$name    =  trim(htmlentities($_POST['userName']));
$tel 	 =  trim(htmlentities($_POST['userPhone']));
$text 	 =  trim(htmlentities($_POST['userMessage']));
$to      = "info@ludommodul.ru";

$EOL = "\r\n";
$boundary     = "--".md5(uniqid(time()));

$subject_text =  'Письмо со страницы: ' . trim(htmlentities($_POST['subject']));
$subject = '=?utf-8?B?' . base64_encode($subject_text) . '?=';

foreach ($_POST as $key => $value ) { $message .= "$key : $value" . $EOL; }

$headers    = "MIME-Version: 1.0;" . $EOL . "";
$headers   .= "Content-Type: multipart/mixed; boundary=\"" . $boundary . "\"" . $EOL . "";
$headers   .= "From: info@ludommodul.ru";

$multipart  = "--" . $boundary . $EOL;
$multipart .= "Content-Type: text/html; charset=utf-8" . $EOL . "";
$multipart .= "Content-Transfer-Encoding: base64" . $EOL . "";
$multipart .= $EOL;
$multipart .= chunk_split(base64_encode($message));


    $filename = $_FILES["userLoad"]["tmp_name"];
    $file = fopen($filename, "rb");
    $data = fread($file,  filesize( $filename ) );
    fclose($file);
    $NameFile = $_FILES["userLoad"]["name"];
    $File = $data;
    $multipart .=  "" . $EOL . "--" . $boundary . $EOL . "";
    $multipart .= "Content-Type: application/octet-stream; name=\"" . $NameFile . "\"" . $EOL . "";
    $multipart .= "Content-Transfer-Encoding: base64" . $EOL . "";
    $multipart .= "Content-Disposition: attachment; filename=\"" . $NameFile . "\"" . $EOL . "";
    $multipart .= $EOL;
    $multipart .= chunk_split(base64_encode($File));


$multipart .= "" . $EOL . "--" . $boundary . "--" . $EOL . "";

mail($to, $subject, $multipart, $headers);

?>