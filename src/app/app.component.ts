import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/auth/auth.service';
import { CartSummaryService } from './shared/services/cart-summary.service';
import { CartService, CartContents } from './core/services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'eCommerceClient';
  isCartOpen:boolean=false;
  itemsInCart:number = 0;
  refreshCart:boolean = false;
  constructor(
    public authService:AuthService,
    private cartSummaryService:CartSummaryService,
    private cartService:CartService,
    private router: Router){

  }
  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    this.cartService.getNoOfItemsInCart(userId!).subscribe(number=>{
      this.itemsInCart=number;
    });
    this.cartService.cartRefresh$.subscribe((refresh) =>{
      this.refreshCart = refresh;
      if(this.refreshCart){
        this.cartService.getNoOfItemsInCart(userId!).subscribe(number=>{
          this.itemsInCart=number;
        });
        this.refreshCart=false;
      }
    })
  }
  

  logout(){
    this.authService.logout().subscribe(()=>{
      localStorage.removeItem('userId');
      this.router.navigate(['']);
    })
  }
  configureShipping(){
    this.router.navigate(['address']);
  }
  returnToHome(){
    this.router.navigate(['home'])
  }
  changeOpenStatus(status:boolean){
    this.isCartOpen=status;
  }
  redirectToFavoritesPage(){
    this.router.navigate(['favorites'])
  }
  redirectToUserTable(){
    this.router.navigate(['user-table'])
  }
  redirectToProductsTable(){
    this.router.navigate(['product-list'])
  }
  redirectToStocktable(){
    this.router.navigate(['stock'])
  }
  redirectToSuppliersTable(){
    this.router.navigate(['suppliers'])
  }
}
