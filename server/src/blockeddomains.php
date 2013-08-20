<?php
	require_once 'includes/class.Database.inc.php';
	header("Access-Control-Allow-Origin: *");
	header('Content-Type: application/json');
	
	// if there POST was set...
	if(isset($_POST) &&
	   !empty($_POST)){

		// if the required key => value pairs are present...
		if(isset($_POST['key']) && !empty($_POST['key']) &&
		   $_POST['key'] == Database::$key){

			//load the file
			$blocked_urls_raw = file("blocked_domains.txt", FILE_IGNORE_NEW_LINES);

			//trim the file contents
			$blocked_urls = array();
			foreach ($blocked_urls_raw as $blocked_url) {
				$blocked_urls[] = trim($blocked_url);
			}

			//encode in json array
			$blocked_urls_json = json_encode($blocked_urls);

			//and print it to the browser
			echo $blocked_urls_json;
			
		}else echo get_error("extension key is invalid or was not provided");
	}

	function get_error($error_message){
		return "{ \"error\" : \"$error_message\" }";
	}

?>