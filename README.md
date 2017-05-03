# FK template
[![GitHub version](https://badge.fury.io/gh/kudinovfedor%2Ffk-template.svg)](https://badge.fury.io/gh/kudinovfedor%2Ffk-template)
[![Build Status](https://travis-ci.org/kudinovfedor/fk-template.svg?branch=master)](https://travis-ci.org/kudinovfedor/fk-template)
[![Dependency status](https://david-dm.org/kudinovfedor/fk-template.svg)](https://david-dm.org/kudinovfedor/fk-template)
[![devDependency Status](https://david-dm.org/kudinovfedor/fk-template/dev-status.svg)](https://david-dm.org/kudinovfedor/fk-template/?type=dev)

This project uses the Pug(Jade) for HTML, Sass for CSS, SMACSS structure with additions, Gulp - the streaming build system, Bower - package manager for the web
#### Installation all components on OS Windows
**[Install Node.js](https://nodejs.org/dist/latest-v6.x/)** **`v6`**

```sh
# install Sass, Pug(Jade), Gulp, Bower, Browser-Sync, Babel, scss_lint, jshint, eslint, dependencies
$ npm run set-all
# IF AN ERROR OCCURS, TRY THE CODE BELOW

# install Sass, scss_lint
$ gem update && gem update --system && gem install sass scss_lint

# update npm
$ npm install -g npm

# install Pug(Jade), Gulp, Babel, Bower, Browser-Sync, jshint, eslint
$ npm install -g gulp-cli pug-cli babel-cli bower browser-sync jshint eslint

# install npm-check-updates [optional]
$ npm install -g npm-check-updates

# install dependencies listed in package.json
$ npm install

# install dependencies listed in bower.json
$ bower install
```
