<?php
	header("Access-Control-Allow-Origin: *");
	
	// if there POST was set...
	if(isset($_POST) &&
	   !empty($_POST)){

		// if the required key => value pairs are present...
		if(isset($_POST['key']) && !empty($_POST['key']) &&
		   isset($_POST['img']) && !empty($_POST['img'])){
		   	$key = $_POST['key'];
		   	$base64string = $_POST['img'];
		   	echo "got here";
			file_put_contents('test.png', base64_decode($base64string));
		}else echo get_error("invalid POST values");
	}

	function get_error($error_message){
		return "{ \"error\" : \"$error_message\" }";
	}

?>
<!DOCTYPE html>
<html>
	<head>
		<title>Title of the document</title>
	</head>

	<body>
	The content of the document......
	</body>

</html>