import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { SharedModule } from '../shared/shared.module';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { LandingComponent } from './components/landing/landing.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import { ProductComponent } from './components/product/product.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';


@NgModule({
  declarations: [
    PublicComponent,
    SignUpComponent,
    LoginComponent,
    LandingComponent,
    HomeComponent,
    ProductComponent,
    CartSummaryComponent
  ],
  exports:[CartSummaryComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule
  ]
})
export class PublicModule { }
