# Clean HTML Template 8in1
This project uses the Jade for HTML, Sass + Compass for CSS, SMACSS structure with additions, Gulp - the streaming build system, Bower - package manager for the web
#### Installation all components on OS Windows
**[Install Ruby](http://rubyinstaller.org/downloads/)**<br/>
**[Install Node.js](https://nodejs.org/dist/latest-v0.12.x/)** `v0.12.8`

```sh
# install Compass, Sass, scss_lint, Jade, Gulp, Bower, htmlhint, jshint, dependencies
$ npm run set-all
# IF AN ERROR OCCURS, TRY THE CODE BELOW

# install Compass, Sass, scss_lint
$ gem update --system && gem install compass sass scss_lint

# install Jade, Gulp, Bower, htmlhint, jshint
$ npm install --global jade gulp bower htmlhint jshint

# install dependencies listed in package.json
$ npm install

# install dependencies listed in bower.json
$ bower install
```
