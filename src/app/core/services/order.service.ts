import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  readonly apiUrl = 'https://localhost:7141/api/order';
  constructor(private http: HttpClient) { }
  checkout(data:any){
    return this.http.post<any>(this.apiUrl+`/checkout`,data,{observe:'response'}); 
  }
}
