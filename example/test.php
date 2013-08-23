<?php

	 require_once("../server/src/includes/class.API.inc.php");
	 
	 Database::init_connection();
	 $api = new API();	 
	 $query_array = array("limit" => 25);
	 $results = json_decode($api->get_JSON_from_GET($query_array))->data;
	 
?>

<!DOCTYPE html>
<html>
	<head>
		<title>Quarzite site test</title>
		<link rel="stylesheet" type="text/css" href="style.css">
	</head>

	<body>
		<div class="image-container">
			<?php foreach($results as $result){ ?>
			<a href="<?php echo $result->url?>" target="_blank"/>
				<img src="<?php echo Database::$root_dir_link ?>/server/history/images/<?php echo $result->filename; ?>" title="<?php echo $result->domain?>"/>
			</a>
			<?php } ?>
		</div>
	</body>

</html>