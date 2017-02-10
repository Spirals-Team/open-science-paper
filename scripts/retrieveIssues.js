(function(){
  $(body).load(Request.loadComment(userrepo,repo));
})();

/* Block Comment */

$(function() {
  var sideComments = require('side-comments');

  var commentable = document.getElementById('commentable-area');

  var size = $('#commentable-area p').length;
  console.log(size);
  for (var i = 0; i < size; i++){
    var p = commentable.getElementsByTagName('p')[i];
    p.setAttribute('class','commentable-section');
    p.setAttribute('data-section-id',i+1);
  }

  var currentUser = {
    id: 1,
    name: Cookie.getCookie("user")
  };

  var pulluri = "https://api.github.com/repos/whispyy/API-git/pulls";
  $.getJSON(pulluri, function(json){
    var existingComments = json
  });

  var existingComments = [
  {
    "sectionId": "1",
    "comments": [
      {
        "authorName": "Jon Sno",
        "comment": "I'm Ned Stark's bastard. Related: I know nothing."
      },
      {
        "authorName": Cookie.getCookie("user"),
        "comment": "Tested side comments."
      }
    ]
  }];

  sideComments = new sideComments('#commentable-area', currentUser,existingComments);

});

