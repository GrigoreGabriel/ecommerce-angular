import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductItem, ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnChanges {
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {}
  productId: any;
  product?: Product;
  selectedOption: number = 0;
  productConfigurations: ProductItem[] = [];
  productPrice: number | undefined;
  quantityValue: number = 1;
  pricebyQuantity : number | undefined;
  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    
    this.productService
    .getProduct(this.productId)
    .subscribe((value) => (this.product = value));
    
    this.productService.getProductConfigurations(this.productId).subscribe((response)=>{
      
      this.productConfigurations=response
      this.productPrice = this.productConfigurations[0].price,
      this.pricebyQuantity = this.productPrice;
    });
    }
    
  

  ngOnChanges(changes: SimpleChanges): void {
    if(changes[this.selectedOption] && !changes[this.selectedOption].firstChange){
      
      this.getProductPrice(this.productId,'','') 
    }
    
  }
  getProductPrice(productId:number,type:string,size:string ){
    this.productService.getProductPrice(productId,type,size).subscribe(price=>{
      this.productPrice=price;
    });
    }
    onOptionChange(){
      const product=this.productConfigurations.find(x=>x.productItemId==this.selectedOption);
      this.productPrice=product?.price;
      this.pricebyQuantity = product?.price;
      
    }
    decrement() {
      if(this.quantityValue>1){
        this.quantityValue--;
        this.productPrice! -= this.pricebyQuantity!
      }
    }
  
    increment() {
      this.quantityValue++;
      this.productPrice! += this.pricebyQuantity!;
    }
  }
  

