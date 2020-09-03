<?php
include("db_conn.php");
date_default_timezone_set('Asia/Taipei');
//$userEmail = $_POST['userEmail'];
$sql = "SELECT `temperature`,`humidity`,`date` FROM `dht11`;";
//echo $sql;
$result = mysqli_query($link, $sql);
$rows = array();
while($record = mysqli_fetch_assoc($result)){
    $rows[] = $record;
}
echo json_encode($rows, JSON_UNESCAPED_UNICODE);