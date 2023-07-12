import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class UserTableComponent implements OnInit {
  userDetails: UserListInfo[] = [];
  apiResponse:any = [];

  ngOnInit(): void {
    this.userService.getUserList().subscribe((response) => {
      this.userDetails = response;
      this.apiResponse = response;
      this.dataSource= new MatTableDataSource(response)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
    });
  }
  constructor(private userService: UserService) {}
  @ViewChild('paginator') paginator! : MatPaginator;
  @ViewChild(MatSort) matSort! : MatSort;
  dataSource :any;
  columnsToDisplay = ['userId','name', 'email', 'country', 'accountStatus'];
  expandedElement!: UserListInfo | null;
  filterData($event:any){
    this.dataSource.filter = $event.target.value
  }
  onChange($event:any){
    let filteredData = _.filter(this.apiResponse,(item)=>{
      if (item.country && item.country.toLowerCase() === $event.value.toLowerCase()) {
        return true;
      }
      if (item.accountStatus && item.accountStatus.toLowerCase() === $event.value.toLowerCase()) {
        return true;
      }
      return false;
    });
    this.dataSource= new MatTableDataSource(filteredData)
  }
}
export interface UserListInfo {
  userId:string;
  name: string;
  phoneNumber: string;
  email: string;
  accountStatus: string;
  city: string;
  region: string;
  country: string;
  addressLine: string;
  postalCode: string;
}


