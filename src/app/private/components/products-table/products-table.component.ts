import { trigger, state, style, transition, animate } from '@angular/animations';
import { ChangeDetectorRef, Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
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
  @ViewChild('outerSort', { static: true }) sort!: MatSort;
  @ViewChildren('innerSort') innerSort!: QueryList<MatSort>;
  @ViewChildren('innerTables') innerTables!: QueryList<MatTable<ProductDetails>>;

  dataSource!: MatTableDataSource<ProductHeader>;
  productsHeader: ProductHeader[] = [];
  columnsToDisplay = ['id', 'brand', 'gender'];
  innerDisplayedColumns = ['id', 'qtyInStock', 'size','price'];
  expandedElement!: ProductHeader | null;
  actualProducts :ProductHeader[] = [];
  constructor(
    private cd: ChangeDetectorRef, 
    private _productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
   this._productService.getProductDetails().subscribe(products => {
    this.actualProducts=products;
    this.productsHeader = products.map(product => {
      if (product.detailsResponse && Array.isArray(product.detailsResponse) && product.detailsResponse.length) {
        return { ...product, detailsResponse: new MatTableDataSource(product.detailsResponse) };
      } else {
        return product;
      }
    });
    this.dataSource = new MatTableDataSource(this.actualProducts);
    this.dataSource.sort = this.sort;
  });

    
  }

  toggleRow(element: ProductHeader) {
    element.detailsResponse && (element.detailsResponse as MatTableDataSource<ProductDetails>).data?.length ? (this.expandedElement  = this.expandedElement === element ? null : element) : null;
    this.cd.detectChanges();
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<ProductDetails>).sort = this.innerSort.toArray()[index]);
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<ProductDetails>).filter = filterValue.trim().toLowerCase());
  }
  redirectToAddProduct(){
    this.router.navigate(['add-product']);
  }
}
// export interface ProductHeader{
//   id:number;
//   name:string;
//   brand:string;
//   gender:string;
//   detailsResponse?: ProductDetails[] | MatTableDataSource<ProductDetails>;
// }
// export interface ProductDetails{
//   id:number;
//   qtyInStock:number;
//   size:string;
//   price:number;
// }