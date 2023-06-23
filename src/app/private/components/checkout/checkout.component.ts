import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { ProductCheckout } from 'src/app/public/services/product.service';
import { UserService } from 'src/app/core/services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit{
itemsInList:ProductCheckout[] =[];
formGroup!:FormGroup;
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
  private userService : UserService,
  private orderService:OrderService,
  private fb:FormBuilder){}
  placeOrder(){
    this.orderService.checkout({userId:this.userId}).subscribe(response=>{

    })
  }
}
