<html>
<?php
include("db_conn.php");

echo $a=$_GET['humidity'];
echo '<br>';
echo $b=$_GET['temperature'];
if(!isset($_GET["humidity"]))
	echo'fauld';

$NewString1 = 'Welcome to Wibibi.';
$NewString2 = 'Have a good day.';
print($NewString1).$NewString2.'<br>';
echo $NewString1.$NewString2;


$conn = new mysqli($servername, $username, $password, $dbname);
					// Check connection
					if ($conn->connect_error) {
					    die("Databses connection failed: " . $conn->connect_error);
					} 
					//---
					$sql = "INSERT INTO dht11(humidity,temperature)	VALUES ('$a','$b')";
					if ($conn->query($sql) === TRUE){
						$conn->close();
						
					}

?>
</html>