import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/auth/auth.service';
import { CartSummaryService } from './shared/services/cart-summary.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'eCommerceClient';
  isCartOpen:boolean=false;
  itemsInCart:number = 0;
  constructor(
    public authService:AuthService,
    private cartService:CartSummaryService,
    private router: Router){

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
}
