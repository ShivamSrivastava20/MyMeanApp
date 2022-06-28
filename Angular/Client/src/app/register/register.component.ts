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



  constructor(
    private formBuilder:FormBuilder,
    //service added 
    private authservice: AuthService) { 
    
}

  ngOnInit(): void {
  }

  form=new FormGroup({
    // Adding validators
  email:new FormControl("", Validators.required),
  username:new FormControl("" , Validators.required),
  password:new FormControl("" , Validators.required),
  confirm:new FormControl("" , Validators.required)
});

// After Ngsubmit control will come to this function from .html file and pls add button inside form tag 
registered()
{
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

 //console.log("this is angular :",user);
 //data-> data which is going to be returned from routes
 this.authservice.registerUser(user).subscribe(data =>
  {
    //we will get return message from authentication.js
    console.log(data);
  });
  //console.log("data:" , dita);
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
