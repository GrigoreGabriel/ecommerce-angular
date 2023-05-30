import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartSummaryService {
  private cartStatus= new Subject<boolean>();
  
  openCartSummary(status:boolean){
    this.cartStatus.next(status)
  }

  constructor() { }
}
