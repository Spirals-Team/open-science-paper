# User Guide

## Publishing an article

First of all clone or fork the project.
To publish an article just edit the ```index.md``` file with the article content. And push it on github.

In the header of ```index.md``` there is field to set up :

* layout : keep to default
* title : title of the article
* description : description of the article (used also for the SEO)
* keywords : keywords of the article (used also for the SEO)
* authors : set the authors of the articles

> Note : It is possible to test in local the web-site following the instruction in the README.md

When all those fields are completed, follow the instruction of the Site Settings parts and simply push it into your github repository. Don't forget to active github pages in the setting of your repository.

## Site Settings

The site settings are located in the ```_config.yml``` they allows user to custom :

* the location of the web-site : By setting up the 'baseurl', you point the sub-url to set up the site <username>.github.io/<baseurl> 
* to make comments and side comments work : it is necessary to complete the <username> and <reponame> variable with the information from the repository you want to push the site.

## Comments & Side Comments

*How does it works ?*

##### To comment with the modal at the bottom of the site the users :

* Login with a github account using the login button.
* Eenter a title. A title can be what ever you want. But it could be also a paragraph number which would place the comment also in the side-comments.
* Body is your comment.
* Send using the 'send comment' button.
* A notification is appearing to confirm the comment is sent.

##### To send a side comment with the box located on each side's paragraph :

* Login with a github account using the login button
* Enter your comment and press 'post'.
* A notification is appearing to confirm the comment is sent.
