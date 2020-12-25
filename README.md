# Overview

CVWO Project

Name: Dai Tianle

Matriculation Number: A0196715U

# Reference
This app is developed based on the [tutorial](https://stevepolito.design/blog/rails-react-tutorial)
For setting up ruby environment on latest mac os, I recommend this [tutorial](https://www.moncefbelyamani.com/the-definitive-guide-to-installing-ruby-gems-on-a-mac/)

# Working app

[Todonex](https://todo-nex.herokuapp.com/)

## Install


### Check your Ruby version

```shell
ruby -v
```

The ouput should start with something like `ruby 2.7.2`

If not, install the right ruby version using [rbenv](https://github.com/rbenv/rbenv) (it could take a while):

```shell
rbenv install 2.7.2
```

### Install dependencies

Using [Bundler](https://github.com/bundler/bundler) and [Yarn](https://github.com/yarnpkg/yarn):

```shell
bundle && yarn
```

### Test offline

```shell
rails server
```

### Initialize the database

```shell
rails db:create db:migrate db:seed
```

### Reset the database

```shell
rails db:migrate:reset 
```

### Add heroku remotes

Using [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli):

```shell
heroku git:remote -a project
heroku git:remote --remote heroku-staging -a project-staging
```

## Deploy


### Directly to production

Push to Heroku production remote:

```shell
git push heroku
```

### With Heroku pipeline (recommended)

Push to Heroku staging remote:

```shell
git push heroku-staging
```

Go to the Heroku Dashboard and [promote the app to production](https://devcenter.heroku.com/articles/pipelines) or use Heroku CLI:

```shell
heroku pipelines:promote -a project-staging
```
