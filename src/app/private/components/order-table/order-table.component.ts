import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { Order, OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss']
})
export class OrderTableComponent implements OnInit{
  @ViewChild('paginator') paginator! : MatPaginator;
  @ViewChild(MatSort) matSort! : MatSort;
  displayedColumns = ['id','userId','city','country','orderDate','phoneNumber','isShipped','totalValue'];
  dataSource :MatTableDataSource<any> = new MatTableDataSource();
  apiResponse:any = [];
  orderList: Order[]=[];
  numberOfOrders:number=0;
  totalOrderValue:number=0;
  favoriteProduct:any[]=[];
  totalOrdersShipped:number=0;

  range = new FormGroup({
		start: new FormControl<Date | null>(null),
		end: new FormControl<Date | null>(null),
	});

  constructor(private orderService:OrderService,
    private router: Router){

      this.dataSource.filterPredicate = (data: any, filter: string) => {
        if (filter) {
          const dateRange = filter.split(',');
            return (
              new Date(data.orderDate).getTime() >= new Date(dateRange[0]).getTime() &&
              new Date(data.orderDate).getTime() <= new Date(dateRange[1]).getTime()
              );
            }
        return true;  
      };
    }
    ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
  
      this.range.valueChanges.subscribe((value) => {
        if (value.start !== null && value.end !== null) {
          this.applyFilter(value.start?.toISOString()!, value.end?.toISOString()!);
        }
      });
    }
    private applyFilter(start: string, end: string) {
      this.dataSource.filter = `${start},${end}`;
    }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(orders=>{
      this.orderList=orders;
      this.dataSource.data = orders; 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
    });
    this.orderService.getNumberOfOrders().subscribe(number=>{
      this.numberOfOrders=number;
    });
    this.orderService.getOrdersTotalValue().subscribe(total=>{
      this.totalOrderValue=total;
    });
    this.orderService.getMostOrderedItem().subscribe(item=>{
      this.favoriteProduct=item;
    });
    this.orderService.getShippedOrdersNumber().subscribe(number=>{
      this.totalOrdersShipped=number;
    });
  }
  filterData($event:any){
    this.dataSource.filter = $event.target.value
  }
  onChange($event:any){
    let filteredData = _.filter(this.apiResponse, (item) => {
      const value = $event.value.toLowerCase();
      if (
        (item.size && item.size.toLowerCase() === value) ||
        (item.type && item.type.toLowerCase() === value) ||
        (item.supplier && item.supplier.toLowerCase() === value) ||
        (item.size && item.size.toLowerCase() === value && item.type && item.type.toLowerCase() === value) ||
        (item.size && item.size.toLowerCase() === value && item.supplier && item.supplier.toLowerCase() === value) ||
        (item.type && item.type.toLowerCase() === value && item.supplier && item.supplier.toLowerCase() === value) ||
        (item.size && item.size.toLowerCase() === value && item.type && item.type.toLowerCase() === value && item.supplier && item.supplier.toLowerCase() === value)
      ) {
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
