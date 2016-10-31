<?php

//check command
if (!isset($_REQUEST['cmd'])) {
    echo "Command is not provided";
    exit();
}
/* get command */
$cmd = $_REQUEST['cmd'];

switch ($cmd) {
    case 3:
        login();
        break;
}


/**
 * function to authenticate user
 */
function login() {

    // checking if username has been entered and store the username and password
    if (isset($_REQUEST['username'])) {
        $username = $_REQUEST['username'];
        $password = $_REQUEST['pword'];

        include_once 'login.php';

        $log = new login();
        $authenticate = $log->userLogin($username, $password);

        // checking if bookings have been gotten from database
        if (!$authenticate) {
            echo '{"result":0,"message":"Error authenticating"}';
            return;
        }

        $row = $log->fetch();
        if (!$row) {
            echo '{"result":0,"message":"username or password is wrong"}';
            return;
        } else {
	// starting the session
            session_start();
	    //storing user details in session
            $_SESSION['USER'] = $row;
	    
            echo '{"result":1,';
            echo '"message": "user authenticated"';
            echo '}';
        }
    }
    
 
}

?>