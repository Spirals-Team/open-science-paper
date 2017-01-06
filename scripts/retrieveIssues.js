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

function requestJSON(url, callback) {
  $.ajax({
    url: url,
    complete: function(xhr) {
      callback.call(null, xhr.responseJSON);
    }
  });
}

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

  var existingComments = [
  {
    "sectionId": "1",
    "comments": [
      {
        "authorAvatarUrl": "http://f.cl.ly/items/1W303Y360b260u3v1P0T/jon_snow_small.png",
        "authorName": "Jon Sno",
        "comment": "I'm Ned Stark's bastard. Related: I know nothing."
      },
      {
        "authorAvatarUrl": "http://f.cl.ly/items/2o1a3d2f051L0V0q1p19/donald_draper.png",
        "authorName": getCookie("user"),
        "comment": "I need a scotch."
      }
    ]
  }];
  sideComments = new sideComments('#commentable-area', currentUser,existingComments);

});
