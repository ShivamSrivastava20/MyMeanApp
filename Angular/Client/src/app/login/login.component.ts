import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,FormBuilder,Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  messageClass: any;
  message: any;
  processing=false;

  

  constructor(
    private formBuilder:FormBuilder,
    private authservice:AuthService,
    private Router:Router
  ) { }

  ngOnInit(): void {}
    form=new FormGroup({
      // Adding validators
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
  });

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
  loginpage()
  {
    this.processing=true;
    this.disabledForm();
    const user={
      username : this.form.controls.username.value,
      password : this.form.controls.password.value
  }
  this.authservice.loginUser(user).subscribe(data =>
    {
     if(!data.success)
     {
      this.messageClass='alert alert-danger';
      this.message=data.message;
      this.processing=false;
      this.enabledForm();
     }
     else{
      this.messageClass='alert alert-success';
      this.message=data.message;
      this.authservice.storeUserData(data.token , data.user);
      setTimeout(()=>
      {
      this.Router.navigate(['/homepage'])
     }, 2000);

     }
    });
}
get username()
{
  return this.form.get("username") as FormControl;
}

get password()
{
  return this.form.get("password") as FormControl;
}
}


