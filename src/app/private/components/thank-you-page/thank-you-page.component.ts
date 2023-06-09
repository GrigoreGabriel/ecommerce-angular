import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-thank-you-page',
  templateUrl: './thank-you-page.component.html',
  styleUrls: ['./thank-you-page.component.scss']
})
export class ThankYouPageComponent implements OnInit {
  orderId:any;
  constructor(
    private activatedRoute: ActivatedRoute,
  ){}
  
  ngOnInit(): void {
    this.orderId = this.activatedRoute.snapshot.paramMap.get('id');
    
  }
}
