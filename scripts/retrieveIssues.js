
function loadComment() {
    //hide button if we're signed in
    if (getCookie("user") == null || getCookie("user") == "")
      $('#signOut').hide();
    else $('#signIn').hide();

    var username = userrepo;
    var reponame = repo;
    var requri   = 'https://api.github.com/users/'+username;
    var repouri  = 'https://api.github.com/repos/'+username+'/'+reponame;
    var issuesuri = 'https://api.github.com/repos/'+username+'/'+reponame+'/issues';
    
    requestJSON(requri, function(json) {
        var outhtml;
        var repo;
        $.getJSON(repouri, function(json){
          repo = json;
          var star_number = repo.stargazers_count;
          outhtml = '<ol class="breadcrumb">';
          outhtml = outhtml+ '<li>Number of star: <span class="badge">'+star_number+'</span></li>';       
          //outhtml = outhtml+ '<li class="btn btn-primary btn-small">Add Star</li>'
          outhtml = outhtml+ '</ol>';
        });

        var issues;
        $.getJSON(issuesuri, function(json){
          issues = json;   
          outputPageContent();  
          toastr["info"]("Comments loaded");              
        })
        .fail(function () {
          toastr["error"]("Comments not loaded <br/> (check User/Repo in _config.yml)");
        });          

        
        function outputPageContent() {
          if(issues.length == 0) { 
            //outhtml = outhtml + '<p>No Comments!</p></div>'; 
            toastr["info"]("No Comments!");
            //return false;
          }
          else {
            issues.reverse();
            outhtml = outhtml + '<p><strong>Comments:</strong></p>';
            $.each(issues, function(index) {
              outhtml = outhtml + '<a href="'+issues[index].html_url+'" target="_blank" class="list-group-item"><h4 class="list-group-item-heading">'+issues[index].user.login+
                          ' : '+issues[index].title+'</h4>'+
                          '<p class="list-group-item-text">'+issues[index].body+'</p></a>';
            });
            outhtml = outhtml + '</div>'; 
          }
          $('#comments').html(outhtml);
        } // end outputPageContent()
    }); // end requestJSON Ajax call
}

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
    name: getCookie("user")
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
        "authorName": getCookie("user"),
        "comment": "Tested side comments."
      }
    ]
  }];

  sideComments = new sideComments('#commentable-area', currentUser,existingComments);

});

