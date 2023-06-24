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
import { ProductsTableComponent } from './private/components/products-table/products-table.component';
import { AddProductComponent } from './private/components/add-product/add-product.component';
import { StockComponent } from './private/components/stock/stock.component';
import { AddStockComponent } from './private/components/add-stock/add-stock.component';
import { CheckoutComponent } from './private/components/checkout/checkout.component';
import { SupplierTableComponent } from './private/components/supplier-table/supplier-table.component';
import { AddSupplierComponent } from './private/components/add-supplier/add-supplier.component';
import { OrderTableComponent } from './private/components/order-table/order-table.component';
import { OrderComponent } from './private/components/order/order.component';
import { ThankYouPageComponent } from './private/components/thank-you-page/thank-you-page.component';
const redirectToLogin=()=> redirectUnauthorizedTo(['login']);
const redirectToHome=()=>redirectLoggedInTo(['home']);
const routes: Routes = [
    {
      path:'',
      pathMatch:'full',
      component:HomeComponent  
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
    {
      path:'product-list',
      component:ProductsTableComponent,
      ...canActivate(redirectToLogin)  
    },
    {
      path:'add-product',
      component:AddProductComponent,
      ...canActivate(redirectToLogin)  
    },
    {
      path:'stock',
      component:StockComponent,
      ...canActivate(redirectToLogin)  
    },
    {
      path:'add-stock',
      component:AddStockComponent,
      ...canActivate(redirectToLogin)  
    },
    {
      path:'checkout',
      component:CheckoutComponent,
      ...canActivate(redirectToLogin)  
    },
    {
      path:'suppliers',
      component:SupplierTableComponent,
      ...canActivate(redirectToLogin)  
    },
    {
      path:'add-supplier',
      component:AddSupplierComponent,
      ...canActivate(redirectToLogin)  
    },
    {
      path:'order-table',
      component:OrderTableComponent,
      ...canActivate(redirectToLogin)  
    },
    {
      path:'order/:id',
      component:OrderComponent,
      ...canActivate(redirectToLogin)  
    },
    {
      path:'thank-you/:id',
      component:ThankYouPageComponent,
      ...canActivate(redirectToLogin)  
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 