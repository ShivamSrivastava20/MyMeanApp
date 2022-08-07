import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup ,Validator, Validators } from '@angular/forms';
// authservice added
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  messageClass: any;
  message: any;
  processing=false;
  


  constructor(
    private formBuilder:FormBuilder,
    //service added 
    private authservice: AuthService) { 
    
}

  ngOnInit(): void {
  }

  form=new FormGroup({
    // Adding validators
  email:new FormControl("", Validators.compose
  ([
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(30),
    
    ])),
  username:new FormControl("" , Validators.compose
  ([
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(20)
    ])),
  password:new FormControl("" , Validators.compose
  ([
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(30)
    ])),
  confirm:new FormControl("" , Validators.required)
});

// functions
/*
validateEmail()
{
  const regExp=new RegExp( /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  if( regExp.test())
  {
    return null;
  }
  else{
    return {'validateEmail' : true};
  }
}*/

matchingPasswords(password: string | number,confirm: string | number)
{
  return (group: FormGroup)=>
  {
    if(group.controls[password].value===group.controls[confirm].value)
    {
      return null;
    }
    else{
      return {"Matching Passwords" :true};
    }
  }
}
disabledForm()
{
  username : this.form.controls.username.disable();
  password : this.form.controls.password.disable();
}
enabledForm()
{
  username : this.form.controls.username.enable();
  password : this.form.controls.password.enable();
}


// After Ngsubmit control will come to this function from .html file and pls add button inside form tag 
registered()
{

  this.processing=true;
  this.disabledForm();
  // This will print entire form data 
 //console.log(this.form)

 //console.log(this.form.controls.username.value);

 //constructing user object and sending it to backed after values are displayed in console
 const user={
  email : this.form.controls.email.value,
  username : this.form.controls.username.value,
  password : this.form.controls.password.value,
  confirm : this.form.controls.confirm.value
 }

 console.log("this is angular :",user);
 //data-> data which is going to be returned from routes
 this.authservice.registerUser(user).subscribe(data =>
  {
   if(!data.success)
    {
      this.messageClass='alert alert-danger';
      this.message=data.message;
    }
    else{
      this.messageClass='alert alert-success';
      this.message=data.message;
    }
    //we will get return message from services
    console.log(data);
  });
 
 
}

// sending this to HTML 
get email()
{
  return this.form.get("email") as FormControl;
}

get username()
{
  return this.form.get("username") as FormControl;
}

get password()
{
  return this.form.get("password") as FormControl;
}
get confirm()
{
  return this.form.get("confirm") as FormControl;
}
}
