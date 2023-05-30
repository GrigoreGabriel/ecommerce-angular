import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss'],
})
export class CartSummaryComponent implements OnInit{
  @Output()
  cartOpen = new EventEmitter<boolean>();
  cartItems : Product[] =[]
  
  ngOnInit(): void {
    const items = localStorage.getItem(JSON.parse('cart'));
     this.cartItems = JSON.parse(items as string) as Product[] 
     console.log(this.cartItems);
     
  }

  closeModal(){
    this.cartOpen.emit(false);
  }
  
}
