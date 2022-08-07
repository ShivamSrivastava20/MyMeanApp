const mongoose = require('mongoose');
const user = require('../Model/user');

// importing json web token

const jwt=require('jsonwebtoken');

// import database config file
const config=require('../Database/db');



mongoose.Promise = global.Promise;
// Routes created here can be tested in postman and its basically backend routes 
// It can be implemented in front end using cors and http client services
// Importing userchema in APIs
const User = require('../Model/user');
// Passing express router here and Returning Api router(routes)
module.exports = (Router) => {
    // creating a Post request and name it as register
    Router.post('/register', (req, res) => {
        if (!req.body.email) {
            res.json({ success: false, message: "Please provide an email" });
        }
        else {
            if (!req.body.username) {
                res.json({ success: false, message: "Please provide a username" });
            }
            else {
                if (!req.body.password) {
                    res.json({ success: false, message: "Please provide a password" });
                }
                else {
                    //creating a new user
                    // User coming from user file which we imported above
                    let user = new User(
                        {
                            email: req.body.email.toLowerCase(),
                            username: req.body.username.toLowerCase(),
                            password: req.body.password
                        });
                    //save the user
                    user.save((err) => {
                        if (err) {
                            if (err.code === 11000) {
                                res.json({ success: false, message: 'UserName or Email already exits !!' });
                            }

                            else {
                                if (err.errors) {
                                    if (err.errors.email) {
                                        res.json({ success: false, message: err.errors.email.message });
                                    }
                                }

                                else {
                                    if (err.errors.username) {
                                        res.json({ success: false, message: err.errors.username.message });
                                    }

                                    else {

                                        if (err.errors.password) {
                                            res.json({ success: false, message: err.errors.password.message });
                                        }
                                        else {
                                            res.json({ success: false, message: 'Error found !!', err })
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            res.json({ success: true, message: 'User Saved' })
                        }
                    }

                    );

                }
            }
        }
        // what user is going to send us
        //req.body.email , we have to check if user sends all these else send back the error

    })

    // Login route
    
    Router.post('/login', (req, res) => {
        if (!req.body.username) {
            res.json({ success: false, message: "Please provide a username" });
        }
        else {
            if (!req.body.password) {
                res.json({ success: false, message: "Please provide a password" });
            }
            else {
                //finding user in database
                                                                // will get either error or user
                User.findOne({ username : req.body.username.toLowerCase()} , (err,user)=>
                {
                     if(err)
                     {
                        res.json({ success: false, message: err })
                     }
                     else{
                        if(!user)
                        {
                            res.json({ success: false, message: "User Not Found!!" })
                        }
                        else{
                            // Decrypt password method we created in user.js , will use that method
                            const validPassword=user.comparePassword(req.body.password);
                            if(!validPassword)
                            {
                                res.json({ success: false, message: "Password Invalid"})
                            }
                            else
                            {
                              // encrypting userid and using secret token to let browser know that particular user sign in 
                              // userId coming from user object above we use if(!user)  // user will log out in 24h


                              // test this in postman and create some function for login in authservice
                             const token= jwt.sign({userId : user._id} , config.secret , {expiresIn : '24h'})
                                res.json({ success: true, message: "Success" , token :token , user : {username:user.username}})
                            }
                        }
                     }
                }
              )
               
           
        }}})
    return Router;
}
