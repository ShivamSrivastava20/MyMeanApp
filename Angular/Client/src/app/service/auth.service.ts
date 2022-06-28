import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 // domain = " http://localhost:8080";
  constructor(private http: HttpClient) { 
 }
//user object we created in register.component.ts file
  registerUser(user:any)
{
  //console.log("This is :" ,user);
return this.http.post<any>('http://localhost:8080/authentication/register',user).pipe(
  map((data: any) => {
    return data;
  })
  

)}}



