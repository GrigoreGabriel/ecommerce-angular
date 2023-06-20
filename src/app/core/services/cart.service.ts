import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
export interface CartContents {
  id:number;
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
  private _cartRefreshSource$ = new Subject<boolean>();
  cartRefresh$= this._cartRefreshSource$.asObservable();
  
  refreshCart(){
    this._cartRefreshSource$.next(true);
  }
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
  addProductToCart(data:any){
    return this.http.post<any>(this.apiUrl+`/productToCart`,data); 
  }
  removeItemFromCart(userId:string,shoppingCartItemId:number){
    return this.http.delete<any>(this.apiUrl+`/removeProductFromCart?userId=${userId}&shoppingCartItemId=${shoppingCartItemId}` , {observe:'response'});
  }
  getTotalCartValue(userId: string) {
    return this.http.get<number>(
      this.apiUrl + `/cartTotalValue?userId=${userId}`
    );
  }
}
