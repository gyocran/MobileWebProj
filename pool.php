<?php

include_once ("adb.php");

/**
 * login class
 */
class pool extends adb {

    /**
     * constructor
     */
    function __construct() {
        
    }

    function getPools() {
        $str_query = "SELECT carpool_pool.pool_pool_id,carpool_user.user_username FROM `carpool_user` inner join carpool_pool on carpool_user.user_user_id = carpool_pool.pool_user_id";

        return $this->query($str_query);
    }
	
	function joinPool($poolId) {
        $str_query = "SELECT * FROM `carpool_pool` where pool_pool_id = $poolId";

        return $this->query($str_query);
    }
	
	function getUserId($username){
		$str_query = "SELECT user_user_id FROM `carpool_user` WHERE user_username=$username";
		return $this->query($str_query);
	}

	function createPool($username,$maxsize,$price,$departuretime) {
		$res = getUserId($username);
		$user = $res->fetch();
        $str_query = "INSERT INTO carpool_pool set
						pool_user_id = $user,
						pool_max_size = $maxsize,
						pool_price = $price,
						pool_departure_time = '$departuretime'
						";

        return $this->query($str_query);
    }
}

?>