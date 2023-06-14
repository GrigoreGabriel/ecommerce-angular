import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ProductCategory,
  ProductService,
} from 'src/app/public/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  categories: ProductCategory[] = [];
  genders = GENDER_OPTIONS;
  success: boolean = false;
  addProductForm = new FormGroup({
    name: new FormControl('', Validators.required),
    brand: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    image_url: new FormControl(''),
  });

  constructor(
    private router: Router,
    private _productService: ProductService
  ) {}

  ngOnInit(): void {
    this._productService
      .getProductCategories()
      .subscribe((categories) => (this.categories = categories));
      
  }

  submitForm() {
    if (this.addProductForm.valid) {
      this._productService
        .addProduct(this.addProductForm.value)
        .subscribe((response) => {
          if (response.status == 200) {
            this.success=true;
            setTimeout(() => {
              this.success=false;
          }, 3000);
          }
        });
    }
  }
}
const GENDER_OPTIONS = [
  {
    name: 'Male',
  },
  {
    name: 'Female',
  },
  {
    name: 'Unisex',
  },
];
