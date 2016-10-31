(function() {

	document.addEventListener('deviceready', onDeviceReady.bind(this), false);
	var pictureSource;
	var destinationType;
	function onDeviceReady() {
		pictureSource = navigator.camera.PictureSourceType;
		destinationType = navigator.camera.DestinationType;

		// document.getElementById("capturePhoto").onclick = function() {
			// navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
				// quality : 50,

				// destinationType : destinationType.DATA_URL
			// });
		// }

		// document.getElementById("geolocationdata").addEventListener("click", function() {
			// navigator.geolocation.getCurrentPosition(onSuccess, onError, {
				// enableHighAccuracy : true
			// });
		// });

		//watchPosition
		// var watchId = navigator.geolocation.watchPosition(onWatchSuccess, onWatchError, {
			// timeout : 30000
		// });

		// document.getElementById("clearWatchbtn").addEventListener("click", function() {
			// navigator.geolocation.clearWatch(watchID);
		// });

		document.getElementById("alertTest").onclick = function() {
			alert("Alert works");
		}
		
		document.getElementById("loginbutton").onclick = login;
		
		document.getElementById("getPools").addEventListener("click",
		getPools);
		
		/* function(){
			alert("pools button clicked");
		}); */
		
	};

	function onPhotoDataSuccess(imageData) {

		var smallImage = document.getElementById('smallImage');

		smallImage.style.display = 'block';

		smallImage.src = "data:image/jpeg;base64," + imageData;

	}

	function onFail(message) {

		alert('Failed because: ' + message);

	}

	///////////geolocation bit/////////////////
	var onSuccess = function(position) {
		alert('Latitude: ' + position.coords.latitude + '\n' + 'Longitude: ' + position.coords.longitude + '\n');
	};

	// onError Callback receives a PositionError object
	//
	function onError(error) {
		alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
	}

	//watchPosition

	var onWatchSuccess = function(position) {
		var element = document.getElementById('divWatchMeMove');
		element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br />' + 'Longitude: ' + position.coords.longitude + '<br />' + '<hr />' + element.innerHTML;
	};

	function onWatchError(error) {
		alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
	}

	function login(){
            var username = $("#username").val();
            var password = $("#password").val();
			// alert(password);
                if (!validateUsername(username))
                {
                    return;
                }
                var url = "login_ajax.php?cmd=3&username=" + username + "&pword=" + password;
                $.ajax(url,
                        {
                            async: true, complete: loginComplete
                        });
            }

/*
             * function to validate username
             */
            function validateUsername(username)
            {
                var rgText= /([a-z]{1,30}).([a-z]{1,30})/;
                if(!rgText.test(username))
                {
                    errorMsg.innerHTML="Invalid Username";
                    return false;
                }
                return true;
                
            }

            /*
             callback function for login method
             */
            function loginComplete(xhr, status)
            {
                if (status != "success")
                {
                    alert("Invalid Login");
                }

                var log = $.parseJSON(xhr.responseText);
                if (log.result == 0)
                {
                    errorMsg.innerHTML = log.message;
                }
                else
                {
					// alert("login success");
                    location.href = "#poolPage";
                }

            }
			
		function getPools(){
                var url = "pool_ajax.php?cmd=3";
                $.ajax(url,
                        {
                            async: true, complete: poolComplete
                        });
           }
		
		function poolComplete(xhr, status)
            {
                if (status != "success")
                {
                    alert("failed to get pools");
                }

                var allPools = $.parseJSON(xhr.responseText);
				console.log(allPools);
                if (allPools.result == 1)
                {
					$("#currentPools tbody").html("");
					for(i=0; i< allPools.pool.length; i++){
					var data = "<tr>"+ 
					"<td id='poolId'>" + allPools.pool[i].pool_pool_id+ "</td>"+
					"<td>" + allPools.pool[i].user_username+ "</td>"+ 
					"<td><a href=\"pool_ajax.php?cmd=2&poolId=\""+ allPools.pool[i].pool_pool_id+"><button class='btn btn-info' id='join'>join</button></a></td>"+ 
					"<td><button class='btn btn-info'>view location</button></td>"
					 "</tr>";
					
					$(data).appendTo("#currentPools tbody");
                }
				}
                else
                {
					console.log("error somewhere");
                }

            }
			
	function joinPoolComplete(){
                var url = "pool_ajax.php?cmd=2?poolId="+poolId;
                $.ajax(url,
                        {
                            async: true, complete: poolComplete
                        });
           }		
			
	function joinPool(poolId){
				alert("join pool entered");
                var url = "pool_ajax.php?cmd=2?poolId="+poolId;
                $.ajax(url,
                        {
                            async: true, complete: joinPoolComplete
                        });
           }
})();

