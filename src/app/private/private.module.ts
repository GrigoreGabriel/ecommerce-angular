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
import { FavoritesComponent } from './components/favorites/favorites.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { MatSortModule } from '@angular/material/sort';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    PrivateComponent,
    AddressComponent,
    UserInfoComponent,
    OrderListComponent,
    FavoritesComponent,
    UserTableComponent,
    ProductsTableComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    SharedModule,
    MatCardModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatInputModule
  ]
})
export class PrivateModule { }
