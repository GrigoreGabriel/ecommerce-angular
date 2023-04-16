import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './public/components/landing/landing.component';
import { LoginComponent } from './public/components/login/login.component';
import { SignUpComponent } from './public/components/sign-up/sign-up.component';
import { HomeComponent } from './public/components/home/home.component';
import {canActivate, redirectUnauthorizedTo,redirectLoggedInTo} from '@angular/fire/auth-guard';
const redirectToLogin=()=> redirectUnauthorizedTo(['login']);
const redirectToHome=()=>redirectLoggedInTo(['home']);
const routes: Routes = [
    {
      path:'',
      pathMatch:'full',
      component:LandingComponent  
    },
    {
      path:'login',
      component:LoginComponent,
      ...canActivate(redirectToHome)  
    },
    {
      path:'sign-up',
      component:SignUpComponent,
      ...canActivate(redirectToHome)  
    },
    {
      path:'home',
      component:HomeComponent,
      ...canActivate(redirectToLogin)  
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 