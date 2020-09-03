angular
.module('App', [])
.controller('LoginConController', ['$scope', function($scope) {
    $scope.done = '';
}])

.directive ('loadingBtn', ['$timeout', function($timeout) {
    return {
        link: function(scope, element, attrs) {
            element.bind('click', function() { 
                if (scope. loading == true || scope.done == 'done') {
                    return;
                }    
                scope.loading = true; element.addClass('loading')
                timeoutId = $timeout(function () {
                    scope.loading = false;
                    element.removeClass('loading');
                    scope.done = 'done';
                }, 2000);
            });
        }
    };
}]);
function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
    if(localStorage.userName != null) {
        document.getElementById("user").value = localStorage.userName;
    }
    if(localStorage.userPassword != null) {
        document.getElementById("passwd").Value = localStorage.userPassword;
    }
}   
function onDeviceReady (){ 
    navigator.geolocation.getCurrentPosition (onSuccess, onError, {
        timeout: 30000
    });
    alert("onDeviceReady");
    getPosition();
}

function getPosition(){
    var options = {
        enableHighAccuracy: true,
        maximumAge: 3600000
    }
    var watchID = navigator.geolocation.getCurrentPosition(onSuccess,onError,options);
    function onSuccess(position){
        localStorage.lon = position.coords.longitude;
        localStorage.lat = position.coords.latitude;
    };

    function onError(position){
        alert('code: '+err.code+"\n"+
              'message:'+error.message+'\n');
    }
}
function login() {
    var id = document.getElementById("user").value;
    var password = document.getElementById("passwd").value;
    $.ajax( {
        datatype: "JSON", 
        type: "POST", 
        url: "http://210.70.80.21/~s106021145/server/login.php", 
        data: "userName=" +id+ "&userPassword=" +password,
        crossDomain: true, 
        cache: false, 
        success: function(data) {
            var obj = JSON.parse(data); 
            if( obj.status == "success") {
                localStorage.userName = id; 
                localStorage.userPassword = password; 
                localStorage.loginType = 0;
                document.location.href="bargraph.html";
            }
            else if(obj.status == "noAccount"){
                alert ("Wrong ID or Password!!"); 
            }
            else if (obj.status == "fail") {
                alert ("Can't connect to DB!");
            }
        },        
        error: function(data) {
            alert ("Error: " + data);
        }
    });
}    
function noteOnLoad(){
    var id = localStorage.userName;
    $.ajax({
        datatype: "JSON",
        type: "POST",
        url: "http://210.70.80.21/~s106021145/dht11/getNotes.php",
        //data: "userEmail=" +id,
        crossDomain: true,
        cache: false,
        success: function(data){
            var obj = JSON.parse(data);
            $("#div3").html('');
            var div3Content='';
            for(var i = 0; i < obj.length; i++){
                div3Content += '<p>' + obj[i].type + ',' + obj[i].title +'</p>';
            }
            $("#div3").append(div3Content);
        },
        error: function(data){
            alert("Error: " + data);
        } 
    });
}    
    