import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';


const routes: Routes = [
  // {
  //   path:'',
  //   redirectTo:'home',
  //   pathMatch:'full',
  //   component:HomeComponent  
  // },
  {
    path:'home/product/:id',
    component:ProductComponent
  },
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class PublicRoutingModule { } 
