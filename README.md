# open-science-paper

A modern web framework for publishing true Open Science papers on GitHub.

---

## System Requirements

### Local Installation

* Clone or Fork the project : [https://github.com/Spirals-Team/open-science-paper](https://github.com/Spirals-Team/open-science-paper)
*  Install bundler (require Ruby)
*  Open the project folder
*  Run `bundle install` to install dependencies
*  Run `bundle exec jekyll serve` or `jekyll serve`

### Deploy using Github

* Commit and push your change into a github repository
* Activate gh-pages for this repository
* Open a web browser `http://<username>.github.io/<foldername>`
  - Don't forget to put the foldername/repository name in baseurl of the `_config.yml`

## Configuration 

We try to make it easier as possible to use. Currently it is needed to care about two files :

* index.md : file containing the publication
* _config.yml : divided in 3 parts
  - *site setting* where you enter the title of the page, a description and some keywords for SEO. Here it is possible to define the url.
  - *authors* a list of authors where it is possible to add name, mail and location.
  - *using issues as comment* it is needed to point us to our git repo so we need username and reponame.

## Releases informations

*See full user guide [here](doc.md) .*

Available there : 

* Post a publication in index.md file.
* Furnish a list of authors will add it in right form.
* Using issue as a comment : if an issue is posted into the git repo, it will be display as a comment in the publication.
* Post comment directly from the publication.
* Adding style.
	* using toast to mark event (like comment sent, ..etc)
* Gather index.md and _config.yml into index.md.
	* every information concerning the article is now in index.md
	* in _config.yml there is just : 
		* site setting : url & baseurl (by default no need to touch it)
		* github setting to allow comment : username & reponame (set it to point to your repo)
* Add the possibility to like the publication using github star.
* Post a comment from pointing a part of the publication.
	* For the moment : using issue.

Available soon :

* Share using social network and mail.

Future Evolution :

* Link authors with some API (ORCID).
* ... etc.

## Librairies used

* [toastr](https://github.com/CodeSeven/toastr)
* [side-comments](http://aroc.github.io/side-comments-demo)