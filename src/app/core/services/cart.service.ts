import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
export interface CartContents {
  productImageUrl: string;
  productName: string;
  productItemType: string;
  quantity: number;
  totalItemValue: number;
}
@Injectable({
  providedIn: 'root',
})
export class CartService {
  readonly apiUrl = 'https://localhost:7141/api/cart';
  constructor(private http: HttpClient) {}

  getNoOfItemsInCart(userId: string) {
    return this.http.get<number>(
      this.apiUrl + `/numberOfItemsInCart?userId=${userId}`
    );
  }
  getCartContents(userId: string){
    return this.http.get<CartContents[]>(
      this.apiUrl + `/cartContents?userId=${userId}`
    );
  }
}
