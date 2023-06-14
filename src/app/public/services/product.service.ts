import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

export interface ProductHeader{
  id:number;
  name:string;
  brand:string;
  gender:string;
  detailsResponse?: ProductDetails[] | MatTableDataSource<ProductDetails>;
}
export interface ProductDetails{
  id:number;
  qtyInStock:number;
  size:string;
  price:number;
}
export interface ProductHeaderDataSource {
  id:number;
  name:string;
  brand:string;
  gender:string;
  details?:MatTableDataSource<ProductDetails>;
}
export interface ProductCategory{
  id:number;
  name:string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly apiUrl = 'https://localhost:7141/api/product';
  constructor(private http: HttpClient) { }
  
  getProductList() :Observable<any>{
    return this.http.get(this.apiUrl+'/productList')
  }
  getProduct(id:number) :Observable<any>{
    return this.http.get(`${this.apiUrl}/product/${id}`)
  }
  getProductDetails() :Observable<ProductHeader[]>{
    return this.http.get<ProductHeader[]>(`${this.apiUrl}/productDetails`)
  }
  getProductCategories() :Observable<ProductCategory[]>{
    return this.http.get<ProductCategory[]>(`${this.apiUrl}/productCategories`)
  }
  addProduct(product:any) {
    return this.http.post<any>(`${this.apiUrl}/addProduct`,product ,{observe:'response'})
  }
}
