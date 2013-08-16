<?php
	require_once 'includes/class.Database.inc.php';
	header("Access-Control-Allow-Origin: *");
	
	// if there POST was set...
	if(isset($_POST) &&
	   !empty($_POST)){

		// if the required key => value pairs are present...
		if(isset($_POST['key']) && !empty($_POST['key']) &&
		   isset($_POST['timestamp']) && !empty($_POST['timestamp']) &&
		   isset($_POST['interval']) && !empty($_POST['interval']) &&
		   $_POST['key'] == Database::$key){

		   	//open connection
		   	Database::init_connection();

		    // update length_visited in database where timestamp == $_POST['timestamp']
		   	$post_array = Database::clean($_POST);
		   	$interval = $post_array['interval'];
		   	$timestamp = $post_array['timestamp'];
		   	$query = "UPDATE metadata SET length_visited=length_visited+$interval WHERE timestamp='" . $timestamp . "' LIMIT 1"; 
		    if(Database::execute_sql($query)) echo "Time logged";
		    else echo "Time not logged";

			Database::close_connection();
			
		}else echo get_error("invalid POST values");
	}

	function get_error($error_message){
		return "{ \"error\" : \"$error_message\" }";
	}

?>