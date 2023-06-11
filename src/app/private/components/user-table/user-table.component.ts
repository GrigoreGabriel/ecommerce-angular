import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
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
  ngOnInit(): void {
    this.userService.getUserList().subscribe((response) => {
      this.userDetails = response;
      this.dataSource=this.userDetails;
    });
  }
  constructor(private userService: UserService) {}
  dataSource :any;
  columnsToDisplay = ['userId','name', 'email', 'country', 'accountStatus'];
  expandedElement!: UserListInfo | null;
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


