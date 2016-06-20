# Clean HTML Template 8in1
This project uses the Pug(Jade) for HTML, Sass + Compass for CSS, SMACSS structure with additions, Gulp - the streaming build system, Bower - package manager for the web
#### Installation all components on OS Windows
**[Install Ruby](http://rubyinstaller.org/downloads/)** **`v2.3.0`**<br/>
**[Install DevKit](http://rubyinstaller.org/downloads/)** `For use with Ruby 2.0 and above` **[optional]**<br/>
```sh
$ cd C:\DevKit
$ ruby dk.rb init
# open C:\DevKit\config.yml
# add this line and save:
- C:/Ruby22-x64
$ ruby dk.rb install
```
**[Install Node.js](https://nodejs.org/dist/latest-v4.x/)** **`v4.4.5`**

```sh
# install Compass, Sass, Pug(Jade), Gulp, Bower, scss_lint, htmlhint, jshint, dependencies
$ npm run set-all
# IF AN ERROR OCCURS, TRY THE CODE BELOW

# install Compass, Sass, scss_lint
$ gem update && gem update --system && gem install compass scss_lint

# install oily_png (must be installed DevKit) [optional]
$ gem install oily_png

# update npm
$ npm install -g npm

# install Pug(Jade), Gulp, Bower, htmlhint, jshint
$ npm install -g pug jade gulp bower htmlhint jshint

# install npm-check npm-check-updates [optional]
$ npm install -g npm-check-updates

# install dependencies listed in package.json
$ npm install

# install dependencies listed in bower.json
$ bower install
```
