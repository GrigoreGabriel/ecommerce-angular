import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { UserService } from 'src/app/core/services/user.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user$ = this.authService.currentUser$;
  cart : Product[] =[];

  products: Product[] = [];
  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private userService: UserService,
    private toast:HotToastService,

  ) {}
  ngOnInit(): void {
    this.productService
      .getProductList()
      .subscribe((product: Product[]) => (this.products = product));
  }

  addToCart(productId:number){
    const cartItem= this.products.find(item=>item.id == productId) as Product
    this.cart.push(cartItem)
    localStorage.setItem('cart',JSON.stringify(this.cart))
  }

  addToFavorites(productId:number){
    const userId = localStorage.getItem('userId');
    this.userService.addFavoriteProduct(userId!,productId).subscribe();
  }
}
