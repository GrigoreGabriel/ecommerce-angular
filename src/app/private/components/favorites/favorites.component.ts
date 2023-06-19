import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
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
  constructor(private userService: UserService,
    private toast:HotToastService
    ) {}

  addToCart(productId:number){}

  removeFromFavorites(productId:number){
    this.userService.removeFavoriteProduct(this.userId, productId).subscribe({
    next: ()=>{
      this.products=this.products.filter(x=>x.id!==productId)
      this.toast.success("Product removed from favorites")
    }});
      
    }
    
  }

