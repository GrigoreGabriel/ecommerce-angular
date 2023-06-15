import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { Product } from 'src/app/public/models/product.model';
// interface FavoriteProduct{
//   id:number,
//   name:string,
//   description:string,
//   gender:string,
//   size:string,
//   image_url:string
// }
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  products: Product[] = [];
  userId: any = '';
  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.userService
      .getFavoriteProducts(this.userId!)
      .subscribe((product: Product[]) => (this.products = product));
  }
  constructor(private userService: UserService) {}
  addToCart(productId:number){}
  removeFromFavorites(productId:number){
    this.userService.removeFavoriteProduct(this.userId,productId).subscribe()
    }
  }

