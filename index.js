
//Express imports (Express)
const express= require("express");
const app=express();
const Router=express.Router();
// Passing router and creating above 
const authentication=require('./routes/authentication')(Router);
// After Express import Mongoose for Database

const mongoose=require('mongoose');
//step 4 create database 
// Fetch module in index.js 
const database=require('./Database/db');
const path=require('path');
// used in routing , will be used in authentication file
const bodyparser=require('body-parser');
const cors=require('cors');

//Step 3 
mongoose.Promise=global.Promise;

//step 5 add variable here in mongoose.connect 
mongoose.connect(database.uri , (error)=>
{
    if(error)
    {
    console.log("Database facing this issue to connect :" , error);
    }
    else
    {
console.log("Your Database is connected to :" , database.db);
    }
}
);
// Checking if mongoose is connected or not 
/*mongoose.connect("name" , ()=>
{
    console.log ("Mongo");
});*/

// step 6 install Angular 

// We have access to angular from both server
/*app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin,X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE,OPTIONS");
    next();
  });*/
app.use(cors({
    origin : 'http://localhost:4200'
}))

app.use(express.static(__dirname+'/Angular/Client/dist/client'));

//body parser middleware paste before routes \
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json());
//creating middleware 
app.use('/authentication',authentication);
//connecting server
app.get('*' , (req,res)=>
{
    res.sendFile(path.join(__dirname + '/Angular/Client/dist/client/index.html'));
});











//step 2: Sending some response to the browser (Express)
app.get('/' , (req,res)=>
{
    res.send("Welcome !!");
});


// step 1:  Connecting to Port 8080 (Express)
app.listen(8080 , ()=>
{
console.log("Localhost : 8080 is running");
})