import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';
import { SharedModule } from '../shared/shared.module';
import { AddressComponent } from './components/address/address.component';
import { MatCardModule } from '@angular/material/card';
import { UserInfoComponent } from './components/user-info/user-info.component';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  declarations: [
    PrivateComponent,
    AddressComponent,
    UserInfoComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    SharedModule,
    MatCardModule,
    MatSidenavModule,
  ]
})
export class PrivateModule { }
