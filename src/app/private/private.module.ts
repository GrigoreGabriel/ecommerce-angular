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
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTreeModule} from '@angular/material/tree';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import { AddProductComponent } from './components/add-product/add-product.component';
import {MatSelectModule} from '@angular/material/select'
import { ReactiveFormsModule } from '@angular/forms';
import { StockComponent } from './components/stock/stock.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddStockComponent } from './components/add-stock/add-stock.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SupplierTableComponent } from './components/supplier-table/supplier-table.component';
import { AddSupplierComponent } from './components/add-supplier/add-supplier.component';
import { OrderTableComponent } from './components/order-table/order-table.component';
import { OrderComponent } from './components/order/order.component';
import { ThankYouPageComponent } from './components/thank-you-page/thank-you-page.component';
@NgModule({
  declarations: [
    PrivateComponent,
    AddressComponent,
    UserInfoComponent,
    OrderListComponent,
    FavoritesComponent,
    UserTableComponent,
    ProductsTableComponent,
    AddProductComponent,
    StockComponent,
    AddStockComponent,
    CheckoutComponent,
    SupplierTableComponent,
    AddSupplierComponent,
    OrderTableComponent,
    OrderComponent,
    ThankYouPageComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    SharedModule,
    MatCardModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatSelectModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    PortalModule,
    ScrollingModule,
    ReactiveFormsModule
  ]
})
export class PrivateModule { }
