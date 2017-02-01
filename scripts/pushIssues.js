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


/* send pullrequest*/
function postPull(user, pass, title, body, head){
  var uploadURL ="https://api.github.com/repos/whispyy/API-git/pulls";
  console.log(uploadURL);
  var data = 
  JSON.stringify(
    {
      title: title, 
      body: body,
      head: head,
      base: "master"
    }
  );
  postJSON(uploadURL, data, user, pass);
}

function postPullFromIssue(user,pass, issue, head){
  var uploadURL ="https://api.github.com/repos/whispyy/API-git/pulls";
  var data = 
  JSON.stringify(
    {
      issue : issue,
      head : head,
      base : "master"
    }
  );
  postJSON(uploadURL, data, user, pass);
}

$(function(){
  sideComments.on('commentPosted', function( comment ){
    postPull(user,pass,"test",comment,"commit: test");
  });
});