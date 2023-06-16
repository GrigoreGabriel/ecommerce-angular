import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { startWith } from 'rxjs';
import { ProductService, ProductShort } from 'src/app/public/services/product.service';
import * as _ from 'lodash'

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
})
export class AddStockComponent implements OnInit {
  productOptions:ProductShort[] = [];

  filteredOptions :any;
  success:boolean = false;

 formGroup!:FormGroup ;

constructor(private productService: ProductService,private fb:FormBuilder){}

  ngOnInit(): void {

    this.productService.getProductShortDetails().subscribe(products=>{
      this.productOptions=products;
      this.filteredOptions=products;
  });
    this.initForm();
}
initForm(){
  this.formGroup=this.fb.group({
    'selectedProduct' : ['']
  })
  this.formGroup?.get('selectedProduct')?.valueChanges.subscribe(response=>{
    this.filterData(response)
  });
}
  submitForm() {
    
  }

filterData(enteredData:any){
  this.filteredOptions = this.productOptions.filter(item=>{
    return item.name.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
  })
}
}
