<?php

include_once ("adb.php");

/**
 * login class
 */
class login extends adb {

    /**
     * constructor
     */
    function __construct() {
        
    }

    /**
     * function authenticates user and gets user details
     * @param string username user name
     * @param string password user password
     */
    function userLogin($username, $password) {
        $str_query = "select user_user_id,user_username,password,user_firstname,user_lastname from carpool_user WHERE user_username='$username' and password='$password'";

        return $this->query($str_query);
    }

}

?>