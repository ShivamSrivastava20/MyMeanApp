import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 // domain = " http://localhost:8080";
 authToken: any;
 user: any;
  constructor(private http: HttpClient) { 
 }
//user object we created in register.component.ts file
// Function to register user account
  registerUser(user:any)
{
  //console.log("This is :" ,user);    authentication api and register routes
return this.http.post<any>('http://localhost:8080/authentication/register',user).pipe(
  map((data: any) => {
    return data;
  })
  

)}
// login user 
loginUser(user:any)
{
  //console.log("This is :" ,user);
return this.http.post<any>('http://localhost:8080/authentication/login',user).pipe(
  map((data: any) => {
    return data;
  })
  

)}

//storing token and user in browser
storeUserData(token: string, user: any)
{
localStorage.setItem('token', token);
localStorage.setItem('user',JSON.stringify(user));
this.authToken=token;
this.user=user;
}
}



