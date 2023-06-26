import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { Order, OrderService, UserOrder } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-user-orders-table',
  templateUrl: './user-orders-table.component.html',
  styleUrls: ['./user-orders-table.component.scss']
})
export class UserOrdersTableComponent implements OnInit {
  @ViewChild('paginator') paginator! : MatPaginator;
  @ViewChild(MatSort) matSort! : MatSort;
  displayedColumns = ['id','orderDate','isShipped','totalValue'];
  dataSource! :MatTableDataSource<any>;
  apiResponse:any = [];
  userId: any;
  userOrders:UserOrder[]=[];
  constructor(
  private activatedRoute: ActivatedRoute,
  private orderService:OrderService,
  private router: Router
  ){}
  ngOnInit(): void {
    this.userId=localStorage.getItem('userId');
    this.orderService.getOrdersByUserId(this.userId).subscribe(orders=>{
      this.userOrders=orders,
      this.dataSource= new MatTableDataSource(orders)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
    });
  }
  filterData($event:any){
    this.dataSource.filter = $event.target.value
  }
  onChange($event:any){
    let filteredData = _.filter(this.apiResponse,(item)=>{
      if (item.gender && item.gender.toLowerCase() === $event.value.toLowerCase()) {
        return true;
      }
      if (item.brand && item.brand.toLowerCase() === $event.value.toLowerCase()) {
        return true;
      }
      return false;
    });
    this.dataSource= new MatTableDataSource(filteredData)
  }
  onIdClick(id:string){
    this.router.navigate(['order/'+id])
  }
}
