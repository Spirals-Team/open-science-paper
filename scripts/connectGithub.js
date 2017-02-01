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

