const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app= express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');



app.use(function (req,res,next){                 //Express Midleware
  var now = new Date().toString();
  var log = `${now}  ${req.method}  ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',function(err){
    if(err)
    console.log('Unable to Connect');
  });
  next();
});

app.use(function (req,res,next){                 //Express Midleware
  res.render('maintenance.hbs');                 //no next here, so the below lines of code will be ignored
});                                              //maintenance and the above log are only executed

app.use(express.static(__dirname+'/public'));     //we can use help.html now

hbs.registerHelper('getCurrentYear',function(){   //acts like a partials     Advanced Templating
  return new Date().getFullYear();              //first argument is the name
});

hbs.registerHelper('screamIt',function(text){   //acts like a partials
  return text.toUpperCase();              //first argument is the name
});

app.get('/', function (req,res){
  //res.send("<h1>Hello Express !<h1/>");
  res.send({
    name: 'Andrew',
    likes: [
      'Citites',
      'Some'
    ]
  });
});

app.get('/about', function(req,res){
  //res.send('About Page ');
  res.render('about.hbs',{
    pageTitle:'About Page Title',
  });
});

app.get('/home', function(req,res){
  //res.send('About Page ');
  res.render('home.hbs',{
    pageTitle:'Home Page',
    message: 'Welcome !!'
  });
});

app.get('/bad', function(req,res){
  res.send({
    errorMessage:"Unable to Connect",
    reason:"Dunno"
  });
});

app.listen(3000,function(){
  console.log('Server is on on port 3000');
});
