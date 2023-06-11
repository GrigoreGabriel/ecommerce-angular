import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './public/components/landing/landing.component';
import { LoginComponent } from './public/components/login/login.component';
import { SignUpComponent } from './public/components/sign-up/sign-up.component';
import { HomeComponent } from './public/components/home/home.component';
import {canActivate, redirectUnauthorizedTo,redirectLoggedInTo} from '@angular/fire/auth-guard';
import { AddressComponent } from './private/components/address/address.component';
import { OrderListComponent } from './private/components/order-list/order-list.component';
import { FavoritesComponent } from './private/components/favorites/favorites.component';
import { UserTableComponent } from './private/components/user-table/user-table.component';
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
    {
      path:'address',
      component:AddressComponent,
      ...canActivate(redirectToLogin)  
    },
    {
      path:'order-list',
      component:OrderListComponent,
      ...canActivate(redirectToLogin)  
    },
    {
      path:'favorites',
      component:FavoritesComponent,
      ...canActivate(redirectToLogin)  
    },
    {
      path:'user-table',
      component:UserTableComponent,
      ...canActivate(redirectToLogin)  
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 