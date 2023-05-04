import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

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
}
