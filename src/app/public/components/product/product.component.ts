import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductItem, ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CartService } from 'src/app/core/services/cart.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnChanges {
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private toast:HotToastService,
    private cartService: CartService
  ) {}
  productId: any;
  product?: Product;
  selectedOption: number = 0;
  productConfigurations: ProductItem[] = [];
  productPrice: number | undefined;
  quantityValue: number = 1;
  pricebyQuantity : number | undefined;
  chosenProductItem : ProductItem | undefined;
  userId: any;
  ngOnInit(): void {

    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    this.userId = localStorage.getItem('userId');
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
      this.quantityValue=1;
      this.chosenProductItem =this.productConfigurations.find(x=>x.productItemId==this.selectedOption);
      this.productPrice=this.chosenProductItem?.price;
      this.pricebyQuantity = this.chosenProductItem?.price;
      
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
    addProductToCart(){
      const productData ={
        userId: this.userId,
        productItemId: this.chosenProductItem?.productItemId,
        quantity: this.quantityValue
      };
      this.cartService.addProductToCart(productData).subscribe({
        next:()=>{
          this.toast.success("Cart has been updated");
        },
        error:()=>{
          this.toast.success("Cart has been updated");
        }
      });
    }
  }
  

