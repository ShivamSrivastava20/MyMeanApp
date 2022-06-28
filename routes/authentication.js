const mongoose=require('mongoose');
const user = require('../Model/user');
mongoose.Promise=global.Promise;

// Importing userchema in APIs
const User=require('../Model/user');
// Passing express router here and Returning Api router(routes)
module.exports=(Router)=>
{
    // creating a Post request and name it as register
    Router.post('/register' , (req,res)=>
    {
        if(!req.body.email)
        {
            res.json({success : false , message : "Please provide an email"});
        }
        else{
            if(!req.body.username)
            {
                res.json({success : false , message : "Please provide a username"});
            }
            else{
                if(!req.body.password)
                {
                    res.json({success : false , message : "Please provide a password"});
                }
       else {
        //creating a new user
        // User coming from user file which we imported above
        let user=new User(
            {
                email:req.body.email.toLowerCase(),
                username:req.body.username.toLowerCase(),
                password:req.body.password
            });
            //save the user
            user.save((err)=>
            {
                if(err)
                {
                   if(err.code===11000)
                    {
                        res.json({success:false , message : 'UserName or Email already exits !!'});
                    }
                
              else{
                    if(err.errors)
                    {
                        if(err.errors.email)
                        {
                            res.json({success:false , message :err.errors.email.message});
                        }
                    }
                    
                    else{
                         if(err.errors.username)
                            {
                                res.json({success:false , message :err.errors.username.message});
                            }
                        
                        else{
                            
                                if(err.errors.password)
                                {
                                    res.json({success:false , message :err.errors.password.message});
                                }
                                else{
                    res.json({success: false , message : 'Error found !!' , err})
                }}}}}
                else{
                    res.json({success: true , message : 'User Saved'})
                }
            }

        );
            
        }
    }}
        // what user is going to send us
        //req.body.email , we have to check if user sends all these else send back the error
        
    })
return Router;
}