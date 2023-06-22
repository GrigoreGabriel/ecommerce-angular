import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ProductService, SupplierHeader } from 'src/app/public/services/product.service';

@Component({
  selector: 'app-supplier-table',
  templateUrl: './supplier-table.component.html',
  styleUrls: ['./supplier-table.component.scss']
})
export class SupplierTableComponent implements OnInit {
  
  @ViewChild('paginator') paginator! : MatPaginator;
  @ViewChild(MatSort) matSort! : MatSort;
  displayedColumns = ['id','name', 'personOfContact', 'phoneNumber', 'registrationNumber'];
  supplierHeader: SupplierHeader[] = [];
  apiResponse:any = [];
  dataSource :any;
  expandedElement!: SupplierHeader | null;
  productBrands:any[]=[];
  constructor(
    private _productService : ProductService,
    private router: Router){}

  ngOnInit(): void {
    this._productService.getSupplierStock().subscribe(suppliers=>{
      this.supplierHeader=suppliers;
      this.apiResponse = suppliers;
      this.dataSource= new MatTableDataSource(suppliers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
    });
  }
  filterData($event:any){
    this.dataSource.filter = $event.target.value
  }
  redirectToAddSupplier(){
    this.router.navigate(['add-supplier']);
  }
}
