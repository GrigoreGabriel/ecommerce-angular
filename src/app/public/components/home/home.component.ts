import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit
{

  user$=this.authService.currentUser$;

  products:Product[] =[];
  constructor(private authService:AuthService,
  private productService:ProductService){
}
  ngOnInit(): void {
    
   this.productService.getProductList().subscribe((product:Product[])=>
   this.products=product);
  }
}
