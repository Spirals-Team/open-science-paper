 
  function requestJSON(url, callback) {
    $.ajax({
      url: url,
      complete: function(xhr) {
        callback.call(null, xhr.responseJSON);
      }
    });
  }

function loadComment() {
    var username = user;
    var reponame = repo;
    var requri   = 'https://api.github.com/users/'+username;
    //var repouri  = 'https://api.github.com/users/'+username+'/repos';
    var issuesuri = 'https://api.github.com/repos/'+username+'/'+reponame+'/issues';
    
    requestJSON(requri, function(json) {
        // else we have a user and we display their info
        /*
        var fullname   = json.name;
        var username   = json.login;
        var aviurl     = json.avatar_url;
        var profileurl = json.html_url;
        var location   = json.location;
        var followersnum = json.followers;
        var followingnum = json.following;
        var reposnum     = json.public_repos;
        
        
        if(fullname == undefined) { fullname = username; }
        
        var outhtml = '<h2>'+fullname+' <span class="smallname">(@<a href="'+profileurl+'" target="_blank">'+username+'</a>)</span></h2>';
        outhtml = outhtml + '<div class="ghcontent"><div class="avi"><a href="'+profileurl+'" target="_blank"><img src="'+aviurl+'" width="80" height="80" alt="'+username+'"></a></div>';
        outhtml = outhtml + '<p>Followers: '+followersnum+' - Following: '+followingnum+'<br>Repos: '+reposnum+'</p></div>';
        outhtml = outhtml + '<div class="repolist clearfix">';
        */

        var issues;
        $.getJSON(issuesuri, function(json){
          issues = json;   
          outputPageContent();                
        });          
        
        function outputPageContent() {
          var outhtml = "";
          if(issues.length == 0) { outhtml = outhtml + '<p>No Comments!</p></div>'; }
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