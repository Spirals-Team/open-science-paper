


$(function(){
  $('#sendIssue').on('click', function(e){
    e.preventDefault();
    if (Cookie.getCookie("user") != null){
      var user = Cookie.getCookie("user");
      var pass = Cookie.getCookie("pass");
    }

    var title = $("input#title").val();
    var body = $("textarea#body").val();

    Request.postIssue(user, pass, title, body, userrepo,repo);
    

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
  Request.postJSON(uploadURL, data, user, pass);
}

$(function(){
  sideComments.on('commentPosted', function( comment ){
    postPull(user,pass,"test",comment,"commit: test");
  });
});