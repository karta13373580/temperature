<?php
//setting header to json
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
//database
define('DB_HOST', '210.70.80.21');
define('DB_USERNAME', 's106021145');
define('DB_PASSWORD', 'dei3Laeg');
define('DB_NAME', 's106021145');

//get connection
$mysqli = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
$connect = mysqli_connect("210.70.80.21", "s106021145", "dei3Laeg", "s106021145");
$query = "SELECT * FROM dht11";
$result = mysqli_query($connect, $query);
$num_rows = mysqli_num_rows($result);
$b=$num_rows;

if(!$mysqli){
  die("Connection failed: " . $mysqli->error);
}

//query to get data from the table->
$query = sprintf("SELECT temperature,humidity,date FROM dht11 ORDER BY `ID`  desc LIMIT 5");

//execute query
$result = $mysqli->query($query);

//loop through the returned data
$data = array();
foreach ($result as $row) {
  
  $data[] =$row;
}
$data=array_reverse($data);

//free memory associated with result
$result->close();

//close connection
$mysqli->close();

//now print the data
print json_encode($data);
?>