function save(user, pass){
	localStorage.setItem('user', user);
	localStorage.setItem('password', pass);
}

$(function(){
  $('#connect').on('click', function(e){
    e.preventDefault();
    var user = $("input#username").val();
    var pass = $("input#password").val();
    save(user, pass);
  })
});