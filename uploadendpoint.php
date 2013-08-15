<?php
	require_once 'class.SimpleImage.php';
	header("Access-Control-Allow-Origin: *");
	ini_set("memory_limit","1G");
	
	// if there POST was set...
	if(isset($_POST) &&
	   !empty($_POST)){

		// if the required key => value pairs are present...
		if(isset($_POST['key']) && !empty($_POST['key']) &&
		   isset($_POST['img']) && !empty($_POST['img'])){
		   	$key = $_POST['key'];
		   	$base64String = urldecode($_POST['img']);
		   	$url = $_POST['url'];
		   	// $width = $_POST['width'];
		   	// $height = $_POST['height'];

		   	//get the timestamp for the filename
		   	$DateTime = new DateTime();
		   	$filename = $DateTime->format(DateTime::ISO8601);

		   	//decode the image and save it
		   	$base64String = str_replace('data:image/png;base64,', '', $base64String);
		   	$image = base64_decode($base64String);
		   	file_put_contents("history/$filename.png", $image);
		   	//$base64Image = base64_decode($base64String);
		   	// $image = new SimpleImage();
		   	// $image->loadPNG($base64Image);
		   	// $image->cut(0, 0, $width, $height);
		   	// $image->save("history/$filename.png");
			echo "Image saved as " . $filename;

			//save the metadata in a sidecart JSON file
			$json = new stdClass();
			$json->url = $url;
			$json = json_encode($json);
			file_put_contents("history/$filename.json", $json);

		}else echo get_error("invalid POST values");
	}

	function get_error($error_message){
		return "{ \"error\" : \"$error_message\" }";
	}

?>