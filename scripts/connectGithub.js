$(function(){
  $('#connect').on('click', function(e){
    e.preventDefault();
    if (navigator.cookieEnabled){
    	var user = $("input#username").val();
    	var pass = $("input#password").val();
    	setCookie("user", user);
    	setCookie("pass", pass);
    	console.log("cookie set");

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
 	$('#signOut').hide();
 	$('#signIn').show();
 })
});

