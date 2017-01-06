function setCookie(sName, sValue) {
    var today = new Date(), expires = new Date();
    expires.setTime(today.getTime() + (365*24*60*60*1000));
    document.cookie = sName + "=" + encodeURIComponent(sValue) + ";expires=" + expires.toGMTString();
}

$(function(){
  $('#connect').on('click', function(e){
    e.preventDefault();
    
    if (navigator.cookieEnabled){
    	var user = $("input#username").val();
    	var pass = $("input#password").val();
    	setCookie("user", user);
    	setCookie("pass", pass);
    	console.log("cookie set");
        toastr["success"]("Login and password saved");

    	//hide button
    	$('#signIn').hide();
    	$('#signOut').show();
    } else {
    	alert("You need to activate cookie.")
    }
    
  })

  $('#signOut').on('click', function(e){
 	e.preventDefault;
 	setCookie("user", "");
 	setCookie("pass", "");
    toastr["success"]("Login and password deleted");
 	$('#signOut').hide();
 	$('#signIn').show();
 })
});

