function getCookie(sName) {
  var cookContent = document.cookie, cookEnd, i, j;
  var sName = sName + "=";
  for (i=0, c=cookContent.length; i<c; i++) {
    j = i + sName.length;
    if (cookContent.substring(i, j) == sName) {
      cookEnd = cookContent.indexOf(";", j);
      if (cookEnd == -1) 
        cookEnd = cookContent.length;
      return decodeURIComponent(cookContent.substring(j, cookEnd));
    }
  }       
  return null;
}

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
    if (getCookie("user") != null){
      var user = getCookie("user");
      var pass = getCookie("pass");
    }
    else {
      alert("You need to be signed in to comment.")
    }
    var title = $("input#title").val();
    var body = $("input#body").val();
    postIssue(user, pass, title, body);
  })
});