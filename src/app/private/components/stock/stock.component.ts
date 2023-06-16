import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/public/services/product.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as _ from 'lodash'
import { Router } from '@angular/router';
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit{
  displayedColumns = ['brand','name','qtyInStock','price','size'];
  dataSource! :MatTableDataSource<any>;
  stockValue:number = 0;
  apiResponse:any = [];
  @ViewChild('paginator') paginator! : MatPaginator;
  @ViewChild(MatSort) matSort! : MatSort;
constructor(private productService: ProductService,
  private router: Router){}

  ngOnInit(): void {
    this.productService.getItemsInStock().subscribe((response)=>{
      this.apiResponse=response;
      this.dataSource= new MatTableDataSource(response)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
    });
    this.productService.getStockValue().subscribe(value=>
      this.stockValue=value);
  }
  filterData($event:any){
    this.dataSource.filter = $event.target.value
  }
  onChange($event:any){
    let filteredData = _.filter(this.apiResponse,(item)=>{
      return item.size.toLowerCase()== $event.value.toLowerCase();
    })
    this.dataSource= new MatTableDataSource(filteredData)
  }
  redirectToAddStock(){
    this.router.navigate(['add-stock']);
  }
}
