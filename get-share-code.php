<?php

if(!isset($_GET["text"])) {
    die();
}

$text = $_GET["text"];
require_once("../jucar/upload/conexion.php");
$time = time();
$minutes = 10;
$timeLessMargin = $time - $minutes*60*1000;

$codesQuery = mysqli_query($conexion, "SELECT * FROM sunflowerseeds");
$codes = array();

while($row = mysqli_fetch_row($codesQuery)){
    array_push($codes, $row[0]);
}

do{
    $code = rand(0, 9999);
}while(in_array($code, $codes));

$length = 4;
$string = substr(str_repeat(0, $length).$code, - $length);
$code = strval($string);
$removedRows = mysqli_query($conexion, "DELETE FROM sunflowerseeds WHERE D < '$timeLessMargin'");


$setNewCode = mysqli_query($conexion, "INSERT INTO sunflowerseeds (CODE, TEXT, D) VALUES ('$code', '$text', '$time')");
header("Location: index.php?code={$code}");
?>