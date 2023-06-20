import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { ProductCheckout } from 'src/app/public/services/product.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit{
itemsInList:ProductCheckout[] =[];
totalValue:number=0;
userDetails:any;
userId:any;
  ngOnInit(): void {
    this.userId=localStorage.getItem('userId');
    this._cartService.getCartContents(this.userId).subscribe(items=>{
      this.itemsInList=items;
    });
    this._cartService.getTotalCartValue(this.userId).subscribe(value=>{
      this.totalValue=value;
    });
    this.userService.getUserDetails(this.userId).subscribe(user=>{
      this.userDetails=user;
    })
  }
constructor(private _cartService:CartService,
  private userService : UserService){}
}
