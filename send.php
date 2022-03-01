<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';
// Переменные, которые отправляет пользователь
$name = $_POST['name'];
$phone = $_POST['phone'];
$processing = $_POST['processing'];

function filter($field, $regexp){
    $field = filter_var(trim($field), FILTER_SANITIZE_STRING);
    if (isset($field) and !empty($field)) {
        if(filter_var($field, FILTER_VALIDATE_REGEXP, array("options"=>array("regexp"=>$regexp)))){
            return $field;
        } else{
            return FALSE;
        }
    }
}

// Формирование самого письма
if (filter($name, "/^[a-zа-яё\s]+$/iu") and filter($phone, "/^[+\-\)\(0-9 ]+$/") and isset($processing)) {
    $title = "Новая заявка";
    $body = "
    <b>Имя:</b><br>$name<br><br>
    <b>Телефон:</b> $phone
    ";
}

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    $mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    $mail->Host       = 'smtp.gmail.com'; // SMTP сервера вашей почты
    $mail->Username   = ''; // Логин на почте
    $mail->Password   = ''; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('', 'Иван Иванов'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('ni.danilkin@gmail.com');  


    // Отправка сообщения
$mail->isHTML(true);
$mail->Subject = 'Заявка';
$mail->Body = $body;    


// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";} 
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
echo json_encode(["result" => $result, "status" => $status]);