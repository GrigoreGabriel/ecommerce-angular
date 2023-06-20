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
  productTypes: any[] = [];
  suppliersList:any[] =[];
  filteredOptions: any;
  success:boolean = false;
  sizeValue:string=''
  formGroup!:FormGroup ;
  selectedProductId:number=0
constructor(private productService: ProductService, private fb:FormBuilder){}

  ngOnInit(): void {

    this.productService.getProductShortDetails().subscribe(products=>{
      this.productOptions=products;
      this.filteredOptions=products;
    });
    this.productService.getProductTypes().subscribe(types=>{
      this.productTypes=types;
    })
    this.productService.getSuppliers().subscribe(suppliers=>
      this.suppliersList=suppliers)
    this.initForm();
}

initForm(){
  this.formGroup=this.fb.group({
    'selectedProductId' : [''],
    'qtyInStock' : [''],
    'purchasePrice': [''],
    'price': [''],
    'size': [''],
    'typeName': [''],
    'supplierName': ['']
  })
  this.formGroup?.get('selectedProductId')?.valueChanges.subscribe(response=>{
    this.filterData(response)
  });
}
  submitForm() {
    this.formGroup.get('selectedProductId')?.setValue(this.selectedProductId);
    this.productService.addProductItem(this.formGroup.value).subscribe((response)=>{
      if (response.status == 200) {
        this.success=true;
        setTimeout(() => {
          this.success=false;
      }, 3000);
      }
    });
    this.formGroup.reset();
  }

filterData(enteredData:any){
  this.filteredOptions = this.productOptions.filter(item=>{
    return item.name.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
    })
  }
  addMeasurementToValue() :void{
    const lastCharacter = this.sizeValue.slice(-1);

  if (!isNaN(parseInt(lastCharacter))) {
    this.sizeValue += 'ml';
  }
  }

  recordSelectedId(id:number){
  this.selectedProductId=id;
 }
}
