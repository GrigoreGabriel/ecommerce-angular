import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/public/services/product.service';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss']
})
export class AddSupplierComponent implements OnInit{
  formGroup!:FormGroup;
  success:boolean = false;
  constructor(
    private productService: ProductService,
    private fb:FormBuilder
    ){}

  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.formGroup=this.fb.group({
      'name' : [''],
      'personOfContact': [''],
      'phoneNumber': [''],
      'registrationNumber': [''],
    });
  }
  submitForm() {
    this.productService.addSupplier(this.formGroup.value).subscribe((response)=>{
      if (response.status == 200) {
        this.success=true;
        setTimeout(() => {
          this.success=false;
      }, 3000);
      }
    });
    this.formGroup.reset();
  }
}
