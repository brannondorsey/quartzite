<?php

class Database {

	public static $root_dir_link = "http://yourdomain.com/subfolder";
	public static $key = 12345; // UUID or equivalent recommended for strong security

	//MySQL database info
	protected static $user     = "your_username";
	protected static $password = "your_password";
	protected static $db       = "your_database_name";
  
	public static $table    = "metadata";	
	protected static $host  = "localhost";
	protected static $mysqli;

	//initialize the database connection
	public static function init_connection(){
		self::$mysqli = new mysqli(self::$host, self::$user, self::$password, self::$db);
		self::$mysqli->set_charset('utf8');
		return is_object(self::$mysqli);
	}

	//close the database connection
	public static function close_connection(){
		self::$mysqli->close();
	}
	
	//execute sql query statement. Used for INSERT and UPDATE mostly. Returns false if query fails
	public static function execute_sql($query) {
		if(self::$mysqli->query($query)) return true;
		else echo self::$mysqli->error;
		return false;
	}

	//handles dynamic formation of INSERT and UPDATE queries from $_POST and executes them
	//post array should be cleaned before using this function
	public static function execute_from_assoc($post_array, $table_name, $statement_type="INSERT", $set_statement=NULL){
		$statement_type = strtoupper($statement_type);
		if($statement_type == "INSERT"){
			$query = $statement_type . " INTO " . $table_name . " ("; 
			foreach($post_array as $key => $value){
				$query .= " `" . $key . "`,";
			}
			$query = rtrim($query, ",");
			$query .= ") VALUES (";
			foreach($post_array as $key => $value){
				//if($key == 'lat' || $key == 'lon' || $value == 0) $query .= " " . $value . ",";
				$query .= " '" . $value . "',";
			}
			$query = rtrim($query, ",");
			$query .= ");";
		}
		//if statement type is UPDATE, the id of the row to update was specified in the $post_array,
		//and what to update (set) was specified
		else if($statement_type == "UPDATE" &&
			    $set_statement != NULL){
			$query = $statement_type . " " . $table_name . " SET " . $set_statement . " = '" . $post_array[$set_statement]
			. "' LIMIT 1";
		}
		else{
			echo "incorrect parameters passed to InsertUpdate::execute_from_assoc()";
		 	return false;
		}
		return self::execute_sql($query);
	}
	
	//returns array of one result row if one result was found or 2D array of all returned rows if multiple were found
	public static function get_all_results($query) {
		$result_to_return = array(); //maybe this shouldnt be like this...
		if ($result = self::$mysqli->query($query)) {
				$i=0;
				while ($row = $result->fetch_assoc()) {
					$result_to_return[$i] = $row;
					$i++;	
				}
			if (count($result_to_return) > 1) {
				return $result_to_return;
			} 
			else if(count($result_to_return) == 1) {
				return $result_to_return[0];
			} 
			else return false; //there were no results found
		}
		else echo " MYSQL QUERY FAILED";
	}

	//returns string or assosciative array of strings
	//mainly for $_POST and $_GET
	public static function clean($string){
		if(isset($string) && !empty($string)){
			$new_string_array;
			//if the string is actually an assoc array
			if(is_array($string)){
				foreach($string as $string_array_key => $string_array_value){
					$string_array_value = self::clean_string($string_array_value);
					$new_string_array[$string_array_key] = $string_array_value;
				}
				$string = $new_string_array;
			}
			//else just clean it
			else $string = self::clean_string($string);
			return $string;
		}
		else return false; //nothing valid was passed as an argument
	}

//------------------------------------------------------------------------------
//HELPERS

	//series of cleans to be perfomed on one string
	protected static function clean_string($string){
		$string = htmlspecialchars($string);
		$string = self::$mysqli->real_escape_string($string);
		return $string;
	}
}

?>