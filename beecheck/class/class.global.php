<?php
class db {
 	private $host      = DB_HOST;
	private $user      = DB_USER;
	private $pass      = DB_PASS;
	private $dbname    = DB_NAME;
	private $port      = DB_PORT;
	private $dbh;
	private $error;
	private $stmt;

	 public function __construct() {
 	$dsn = 'mysql:host='.$this->host.';dbname='.$this->dbname.';port='.$this->port;
	 	$options = array(PDO::ATTR_PERSISTENT => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_EMULATE_PREPARES => false, PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => false);
	 	try {
	 	  $this->dbh = new PDO($dsn, $this->user, $this->pass, $options);
	 	} catch(PDOException $e) {
 	  $this->error = $e->getMessage();
	 	}
	 }

	// GENERAL

	public function q($query){
		$this->stmt = $this->dbh->prepare($query);
	}

	public function x(){
    return $this->stmt->execute();
	}

	public function s(){
    $this->x();
    return $this->stmt->fetch(PDO::FETCH_ASSOC);
	}

	public function m(){
    $this->x();
    return $this->stmt->fetchAll(PDO::FETCH_ASSOC);
	}

	//

	public function cq(){
		$this->x();
    return $this->stmt->rowCount();
	}

	public function lid(){
    return $this->dbh->lastInsertId();
	}

	public function et() {
    return $this->dbh->commit();
	}

	public function rc() {
    return $this->dbh = null;
	}


}

?>