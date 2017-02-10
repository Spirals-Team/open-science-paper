$(function(){
   
  /*
   * Connexion a github
   * Sauvegarde du cookie d'accès
   */
  $('#connect').on('click', function(e){
    e.preventDefault();
    
    if (navigator.cookieEnabled){
    	var user = $("input#username").val();
    	var pass = $("input#password").val();
    	Cookie.setCookie("user", user);
    	Cookie.setCookie("pass", pass);
    	console.log("cookie set");
        toastr["success"]("Login and password saved");

    	//hide button
    	$('#signIn').hide();
    	$('#signOut').show();
    } else {
    	alert("You need to activate cookie.")
    }
    
  })
  
  /*
   * Déconnexion de github
   * Supprime le cookie d'accès
   */
  $('#signOut').on('click', function(e){
 	e.preventDefault;
 	Cookie.setCookie("user", "");
 	Cookie.setCookie("pass", "");
    toastr["success"]("Login and password deleted");
 	$('#signOut').hide();
 	$('#signIn').show();
 })
});

