const path = require('path');
const express = require('express');
const app = express();
const appDefault=require('./route/app-default');
const appRoute=require('./route/app-route');


app.use(express.static('public'));  //documents can access this path. for example can get their css and js files
app.use(express.urlencoded({extended: false})) //now we can use req.body

app.use('/',appDefault);
app.use('/',appRoute);


app.set('views',path.join(__dirname,'views')); //when do we want to use ejs  we have to write this code
app.set('view engine','ejs')


app.use(function(req,res){  //404 errors
  res.status(404).render('404');
})
app.use(function(error,req,res,next){  //500 errors
  res.status(500).render('500');
})

app.listen(3000);