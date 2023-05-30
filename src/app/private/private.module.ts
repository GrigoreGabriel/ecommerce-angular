import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';
import { SharedModule } from '../shared/shared.module';
import { AddressComponent } from './components/address/address.component';
import { MatCardModule } from '@angular/material/card';
import { UserInfoComponent } from './components/user-info/user-info.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { OrderListComponent } from './components/order-list/order-list.component';

@NgModule({
  declarations: [
    PrivateComponent,
    AddressComponent,
    UserInfoComponent,
    OrderListComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    SharedModule,
    MatCardModule,
    MatSidenavModule,
    MatTableModule
  ]
})
export class PrivateModule { }
