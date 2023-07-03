const path = require('path');
const fs=require('fs');
const express = require('express');
const app = express();

function upadateDatabase(newUser){
    const filePath=path.join(__dirname,'..','data','restaurants.json');
    const dataObject=JSON.parse(fs.readFileSync(filePath));
    dataObject.push(newUser)
    fs.writeFileSync(filePath, JSON.stringify(dataObject));
}

module.exports= {
    upadateDatabase: upadateDatabase
}