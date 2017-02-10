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

Available there : 

* Post a publication in index.md file.
* Furnish a list of authors will add it in right form.
* Using issue as a comment : if an issue is posted into the git repo, it will be display as a comment in the publication.
* Post comment directly from the publication.
* Adding style.
	* using toast to mark event (like comment sent, ..etc)

Available soon :

* Gather index.md and _config.yml into index.md.
* Add the possibility to like the publication using github star.
* Share using social network and mail.

Future Evolution :

* Post a comment from a pointing a part of the publication.
* Link authors with some API (ORCID).

* ... etc.