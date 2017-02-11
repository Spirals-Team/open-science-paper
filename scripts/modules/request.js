/*
 * Module : Request
 * Author : JF Durand & V. Frolkova
 *
 * Require : Cookie, toastr
 * Usage : define ajax function to communicate with github API.
 * Also define a loadcomment function that write on a div
 */

(function(global){
  var Module = (function(){
    var func = {
      postJSON : postJSON,
      requestJSON : requestJSON,
      postIssue : postIssue,
      loadComment : loadComment
    };

    function postJSON(url, data, user, pass, userrepo, repo) {
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
        toastr["success"]("Issue sent");
        setTimeout(function(){
          loadComment(userrepo, repo);
          console.log('refreshed')
        },3000);
        ;
      })
      .fail(function() {
        // body...
        toastr["error"]("Invalid login");
      });
    }

    function requestJSON(url, callback) {
      $.ajax({
        url: url,
        complete: function(xhr) {
          callback.call(null, xhr.responseJSON);
        }
      });
    }

    function postIssue(user, pass, title, body,userrepo, repo){
      var uploadURL ="https://api.github.com/repos/"+userrepo+"/"+repo+"/issues";
      console.log(uploadURL);
      if (user == null || user == ""){
          toastr["warning"]("You need to be signed in to comment");
          return false;
      }
      if (title == "" || body == ""){
          toastr["warning"]("All fields must be completed");
          return false;
      }

      var data = 
      JSON.stringify(
        {
            title: title, 
            body: body
          }
        );

      postJSON(uploadURL, data, user, pass, userrepo, repo);
        
    }

    function loadComment(username, reponame) {
        //hide button if we're signed in
        if (Cookie.getCookie("user") == null || Cookie.getCookie("user") == "")
          $('#signOut').hide();
        else $('#signIn').hide();

        //var username = userrepo;
        //var reponame = repo;
        var requri   = 'https://api.github.com/users/'+username;
        var repouri  = 'https://api.github.com/repos/'+username+'/'+reponame;
        var issuesuri = 'https://api.github.com/repos/'+username+'/'+reponame+'/issues';
        
        requestJSON(requri, function(json) {
            var outhtml;
            var repo;
            $.getJSON(repouri, function(json){
              repo = json;
              var star_number = repo.stargazers_count;
              outhtml = '<ol class="breadcrumb primary">';
              outhtml = outhtml+ '<li>Number of star: <span class="badge">'+star_number+'</span></li>';       
              outhtml = outhtml+ '<li><a target ="_blank" href="https://github.com/'+username+'/'+reponame+'/"><i class="fa fa-star"></i>Star</a></li>'
              outhtml = outhtml+ '</ol>';
            });

            var issues;
            $.getJSON(issuesuri, function(json){
              issues = json;
              outputPageContent();
              sidePageContent();
              toastr["info"]("Comments loaded");              
            })
            .fail(function () {
              toastr["error"]("Comments not loaded <br/> (check User/Repo in _config.yml)");
            });          

            /*
             * Print comment at the bottom of the page
             */
            function outputPageContent() {
              if(issues.length == 0) { 
                toastr["info"]("No Comments!");
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

            /*
             * put comment to the sidecomment
             */
            function sidePageContent(){
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

              var existingComments = [];
              $.each(issues, function(index){
                for (var i = 0; i < size; i++){
                  if (issues[index].title == i)
                    existingComments.push({
                        "sectionId": i.toString(),
                        "comments":[
                          {
                            "authorName": issues[index].user.login,
                            "comment": issues[index].body
                          }]
                    });
                }
              });
              console.log(existingComments);
              sideComments = new sideComments('#commentable-area', currentUser,existingComments);
              console.log(sideComments);
            }
        }); // end requestJSON Ajax call
    }

    return func;
  })();
  global.Request = Module;
})(this);





