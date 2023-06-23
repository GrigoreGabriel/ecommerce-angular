import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orderItems:any[]=[];
  orderId:any;
  userDetails:any[]=[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService:OrderService){}
  ngOnInit(): void {
    this.orderId = this.activatedRoute.snapshot.paramMap.get('id');
    this.orderService.getOrderById(this.orderId).subscribe(items=>{
      this.orderItems=items;
    });
    this.orderService.getUserDetailsByOrderId(this.orderId).subscribe(user=>{
      this.userDetails=user;
    });
   }
}
