<?php
	require_once 'includes/class.Database.inc.php';
	header("Access-Control-Allow-Origin: *");
	ini_set("memory_limit","1G");
	
	// if there POST was set...
	if(isset($_POST) &&
	   !empty($_POST)){

		// if the required key => value pairs are present...
		if(isset($_POST['key']) && !empty($_POST['key']) &&
		   isset($_POST['img']) && !empty($_POST['img']) &&
		   $_POST['key'] == Database::$key){

		   	//open connection
		   	Database::init_connection();
		   	
		    $base64String = urldecode($_POST['img']);

			unset($_POST['key']); //remove the key
			unset($_POST['img']); //remove the image
			unset($_POST['uploadEndpointUrl']); //remove the url to this page
		    $post_array = Database::clean($_POST);

		    $previous_page = get_previous_page();
		    
		    //if the database is empty or the url is different from the last page's logged in the db...
		    //save the image and log its metadata in the db
		    if(!$previous_page ||
		    	$post_array['url'] != $previous_page['url']){

		    	//get the timestamp for the filename
			   	$DateTime = new DateTime();
			   	$filename = $DateTime->format(DateTime::ISO8601);

			   	//decode the image and save it
			   	$base64String = str_replace('data:image/png;base64,', '', $base64String);
			   	$image = base64_decode($base64String);
			   	file_put_contents("../history/images/$filename.png", $image);

				//save the metadata in the database
				if($post_array['referrer'] == "") unset($post_array['referrer']);
				if(isset($_SERVER['HTTP_X_FORWARDED_FOR'])) $post_array['forward_from'] = $_SERVER['HTTP_X_FORWARDED_FOR'];
				$post_array['timestamp'] = $filename; //save the timestamp
				$post_array['filename'] = urlencode($filename) . ".png"; //save the filename
				$post_array['ip'] = $_SERVER['REMOTE_ADDR']; //add the ip address
				// var_dump($post_array);
				if(Database::execute_from_assoc($post_array, "metadata")) echo "Image saved as: " . $filename;

		    }else{ //if this page was a refresh
		    	echo "Refresh detected\n\r";
		    	echo "Previous timestamp: " . $previous_page['timestamp'];
		    }
			Database::close_connection();
			
		}else echo get_error("invalid POST values");
	}

	function get_error($error_message){
		return "{ \"error\" : \"$error_message\" }";
	}

	//returns an array containing the column values of the last page logged in the database
	function get_previous_page(){
		$query = "SELECT * FROM " . Database::$table . " ORDER BY timestamp DESC LIMIT 1";
		return Database::get_all_results($query);
	}

?>