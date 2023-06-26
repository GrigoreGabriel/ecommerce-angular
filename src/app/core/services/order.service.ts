import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
export interface Order{
  id:string;
  userId:string;
  orderDate:Date;
  country:string;
  city:string;
  phoneNumber:string;
  totalValue:number;
}
export interface UserOrder{
  id:string;
  orderDate:Date;
  country:string;
  city:string;
  phoneNumber:string;
  totalValue:number;
}
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  readonly apiUrl = 'https://localhost:7141/api/order';
  constructor(private http: HttpClient) { }
  checkout(data:any){
    return this.http.post<any>(this.apiUrl+`/checkout`,data,{observe:'response'}); 
  }
  getAllOrders(){
    return this.http.get<Order[]>(
      this.apiUrl + `/allOrders`
    );
  }
  getOrderById(orderId:string){
    return this.http.get<any[]>(
      this.apiUrl + `/orderById?orderId=${orderId}`
    );
  }
  getUserDetailsByOrderId(orderId:string){
    return this.http.get<any[]>(
      this.apiUrl + `/userDetailsByOrderId?orderId=${orderId}`
    );
  }
  getNumberOfOrders(){
    return this.http.get<number>(
      this.apiUrl + `/numberOfOrders`
    );
  }
  getOrdersTotalValue(){
    return this.http.get<number>(
      this.apiUrl + `/totalOrdersValue`
    );
  }
  getOrdersByUserId(userId:string){
    return this.http.get<UserOrder[]>(
      this.apiUrl + `/userOrdersById?userId=${userId}`
    );
  }
  getMostOrderedItem(){
    return this.http.get<any[]>(
      this.apiUrl + `/mostOrderedItem`
    );
  }
  getShippedOrdersNumber(){
    return this.http.get<number>(
      this.apiUrl + `/itemsShipped`
    );
  }
}
