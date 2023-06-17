import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartContents, CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss'],
})
export class CartSummaryComponent implements OnInit{
  @Output()
  cartOpen = new EventEmitter<boolean>();
  userId:any;
  cartContents: CartContents[]= [];
constructor(private cartService: CartService){}
  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
     this.cartService.getCartContents(this.userId).subscribe((response)=>{
      this.cartContents=response;
     })
  }

  closeModal(){
    this.cartOpen.emit(false);
  }
  
}
