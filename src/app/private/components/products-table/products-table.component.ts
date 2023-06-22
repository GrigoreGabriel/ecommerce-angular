import { trigger, state, style, transition, animate } from '@angular/animations';
import { ChangeDetectorRef, Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { Product } from 'src/app/public/models/product.model';
import { ProductDetails, ProductHeader, ProductService } from 'src/app/public/services/product.service';
@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProductsTableComponent {
  @ViewChild('paginator') paginator! : MatPaginator;
  @ViewChild(MatSort) matSort! : MatSort;

  dataSource! :MatTableDataSource<any>;
  productsHeader: ProductHeader[] = [];
  apiResponse:any = [];
  displayedColumns = ['id','name','brand','gender','noOfConfigs'];
  productBrands:any[]=[];
  constructor(
    private _productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
   this._productService.getProductDetails().subscribe(products => {
    this.productsHeader=products;
    this.apiResponse = products
    this.dataSource= new MatTableDataSource(products)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
   });
   this._productService.getProductBrands().subscribe(brands=>{
    this.productBrands=brands;
  })
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
  redirectToAddProduct(){
    this.router.navigate(['add-product']);
  }
  }