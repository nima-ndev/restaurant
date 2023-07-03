const path = require('path');
const fs=require('fs');
const express=require('express');
const route = express.Router();
const uuid=require('uuid');
const appData=require('../util/app-data');

const filePath=path.join(__dirname,'..','data','restaurants.json');


route.get('/confirm',function(req,res){
  res.render('confirm');
})

route.get('/recommend',function(req,res){
  res.render('recommend');
})
route.post('/recommend',function(req,res){
  const nRestaurant=req.body;
  nRestaurant.id=uuid.v4();
  appData.upadateDatabase(nRestaurant);  //use function in another js file

  res.redirect('/confirm'); 
})
route.get('/restaurants',function(req,res){
  const dataObject=JSON.parse(fs.readFileSync(filePath));
  let byName=req.query.byName;
  let aOz='ab';
  dataObject.sort(function(resA,resB){
    if(byName=='ab' && resA.name>resB.name ||
    byName=='ba' && resB.name>resA.name){
      return 1;
    }
    return -1;
  });
  if(byName=='ab'){
    aOz='ba';
  }
  res.render('restaurants', {numerOfrestaurant: dataObject.length, dataObject: dataObject, aOz:aOz});
})
route.get('/:ri/restaurantsd',function(req,res){
  goalURL=req.params.rid;
  const dataObject=JSON.parse(fs.readFileSync(filePath));
  for(restaurant of dataObject){
    if(restaurant.id==goalURL){
      return res.render('restaurants-details',{restaurant:restaurant});
    }
  }
  res.status(404).render('404');
})

module.exports= route;