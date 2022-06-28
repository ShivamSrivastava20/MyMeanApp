import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';


//building our first routes
const routes: Routes = [
  {
    path : 'homepage',
    component:HomepageComponent
  },
  {
    path : 'register',
    component:RegisterComponent
  },
  {
    path : 'login',
    component:LoginComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
 
})
export class AppRoutingModule { }
