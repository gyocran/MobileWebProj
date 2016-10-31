<?php

//check command
if (!isset($_REQUEST['cmd'])) {
    echo "Command is not provided";
    exit();
}
/* get command */
$cmd = $_REQUEST['cmd'];

switch ($cmd) {
	case 1:
        createPool();
        break;
	case 2:
        joinPool();
        break;
    case 3:
        getPools();
        break;
}

function createPool(){
	
	$username = $_REQUEST['username'];
	$maxpoolsize = $_REQUEST['maxpoolsize'];
	$price = $_REQUEST['price'];
	$depaturetime = $_REQUEST['departuretime'];
	
	include_once 'pool.php';
	$result = new pool();
	
	if ($result->createPool($username,$maxpoolsize,$price,$departuretime)) {
        echo '{"result":1, "message":"Pool Created"}';
        return;
    }
	else{
		'{"result":0, "message":"Pool creation failed"}';
	}
}

function joinPool(){
	if(!isset($_REQUEST['poolId'])){
			echo  '{"result":0, "message":"Pool id not provided"}';
			exit();
		}
	
	$pool_id = $_REQUEST['poolId'];
	
	include_once 'pool.php';
	$result = new pool();
	$authenticate = $result->getPools();
	
	if (!$authenticate) {
            echo '{"result":0, "message":"retrieval failed"}';
            return;
        }
	$row = $result->fetch();
	if (!$row) {
            echo '{"result":0, "message":"unable to retrieve data"}';
            return;
    } else {
		echo json_encode($row);
	}
}

function getPools() {

    // checking if username has been entered and store the username and password

        include_once 'pool.php';

        $result = new pool();
        $authenticate = $result->getPools();

        // checking if bookings have been gotten from database
        if (!$authenticate) {
            echo "Error getting pool data";
            return;
        }

        $row = $result->fetch();
        if (!$row) {
            echo "unable to get pool data";
            return;
        } else {
			echo '{"result":1,"pool":[';
			while ($row) {
				echo json_encode($row);
				$row = $result->fetch();
					if ($row) {
						echo ',';
					}
			}
			echo ']}';
				// echo $row['user_username'];
				// $row = $result->fetch();
			}
        }
    
?>