function postJSON(url, data, user, pass) {
  $.ajax({
    type: "POST",
    headers: {
    "Authorization": "Basic " + btoa(user + ":" + pass)
    },
    url: url,
    data: data,
    contentType: "application/json",
    dataType: "json"
  })
  .done(function( data ) {
    console.log( data );
  });
}

function postIssue(user, pass, title, body){
	var uploadURL ="https://api.github.com/repos/whispyy/API-git/issues";
	console.log(uploadURL);
	var data = 
	JSON.stringify(
	  {
      	title: title, 
      	body: body
      }
    );

    postJSON(uploadURL, data, user, pass);
}

$(function(){
  $('#sendIssue').on('click', function(e){
    e.preventDefault();
    var user = $("input#username").val();
    var pass = $("input#password").val();
    var title = $("input#title").val();
    var body = $("input#body").val();
    postIssue(user, pass, title, body);
  })
});