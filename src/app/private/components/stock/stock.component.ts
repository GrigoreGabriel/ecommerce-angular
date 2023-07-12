import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/public/services/product.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as _ from 'lodash'
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit{
  displayedColumns = ['brand','name','supplier','purchasePrice','qtyInStock','type','price','size'];
  dataSource! :MatTableDataSource<any>;
  stockValue:number = 0;
  apiResponse:any = [];
  supplierNames :any[] =[];
  productSizes : any[] =[];

  @ViewChild('paginator') paginator! : MatPaginator;
  @ViewChild(MatSort) matSort! : MatSort;
  @ViewChild('searchSelect') searchSelect!: MatSelect;
  @ViewChild('essenceSelect') essenceSelect!: MatSelect;
  @ViewChild('supplierSelect') supplierSelect!: MatSelect;
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
    this.productService.getSupplierNames().subscribe(names=>{
      this.supplierNames=names;
    });
    this.productService.getProductSizes().subscribe(sizes=>{
      this.productSizes=sizes;
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
  redirectToAddStock(){
    this.router.navigate(['add-stock']);
  }
  resetFilters(){
    this.productService.getItemsInStock().subscribe((response)=>{
      this.apiResponse=response;
      this.dataSource= new MatTableDataSource(response)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
    });
    this.searchSelect.options.forEach((data: MatOption) => data.deselect());
    this.essenceSelect.options.forEach((data: MatOption) => data.deselect());
    this.supplierSelect.options.forEach((data: MatOption) => data.deselect());
  }
  
}
