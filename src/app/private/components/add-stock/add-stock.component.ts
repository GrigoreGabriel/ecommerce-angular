import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService, ProductShort } from 'src/app/public/services/product.service';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
})
export class AddStockComponent implements OnInit {
  productOptions:ProductShort[] = [];


  success:boolean = false;

  addProductForm = new FormGroup({
    selectProduct: new FormControl('', Validators.required),
    
  });
constructor(private productService: ProductService)
{}

  ngOnInit(): void {
    this.productService.getProductShortDetails().subscribe(products=>{
      this.productOptions=products;
      console.log(this.productOptions);
      
    });
  }
  

  submitForm() {}

}
