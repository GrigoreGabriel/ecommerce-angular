import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

export interface ProductHeader{
  id:number;
  name:string;
  brand:string;
  gender:string;
  noOfConfigs:number;
}
export interface ProductDetails{
  id:number;
  qtyInStock:number;
  size:string;
  price:number;
}
export interface ProductCheckout{
  id:number;
  productImageUrl:string;
  productName:string;
  productItemType:string;
  quantity:number;
  totalItemValue:number;
}
export interface ProductCategory{
  id:number;
  name:string;
}
export interface ProductItem{
  productItemId:number,
  size:string;
  type:string;
  price:number;
}
export interface ProductShort{
  id:number;
  name:string;
  variations:number;
}
export interface SupplierHeader{
  id:number;
  name:string;
  personOfContact:string;
  phoneNumber:string;
  registrationNumber:string;
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
  getItemsInStock() :Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/itemsInStock`)
  }
  getStockValue() :Observable<any>{
    return this.http.get<number>(`${this.apiUrl}/stockValue`)
  }
  getProductTypes() :Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/productTypes`)
  }
  getProductConfigurations(productId:number) :Observable<ProductItem[]>{
    return this.http.get<ProductItem[]>(`${this.apiUrl}/productConfigurations?productId=${productId}`)
  }
  getProductPrice(productId:number,type:string,size:string) :Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/productPrice?productId=${productId}&type=${type}&size=${size}`)
  }
  getProductShortDetails() :Observable<ProductShort[]>{
    return this.http.get<ProductShort[]>(`${this.apiUrl}/productShortDetails`)
  }
  addProductItem(productItem:any) {
    return this.http.post<any>(`${this.apiUrl}/addProductItem`,productItem ,{observe:'response'})
  }
  getSuppliers() :Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/getSuppliers`)
  }
  getSupplierStock() :Observable<SupplierHeader[]>{
    return this.http.get<SupplierHeader[]>(`${this.apiUrl}/getSupplierStock`)
  }
  getProductBrands() :Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/productBrands`)
  }
  getSupplierNames() :Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/supplierNames`)
  }
  getProductSizes() :Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/productSizes`)
  }
  addSupplier(supplier:any) {
    return this.http.post<any>(`${this.apiUrl}/addSupplier`,supplier ,{observe:'response'})
  }
}
