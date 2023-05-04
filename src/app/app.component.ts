import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'eCommerceClient';
  constructor(
    public authService:AuthService,
    private router: Router){

  }
  logout(){
    this.authService.logout().subscribe(()=>{
      this.router.navigate(['']);
    })
  }
  configureShipping(){
    this.router.navigate(['address']);
  }
  returnToHome(){
    this.router.navigate(['home'])
  }
}
