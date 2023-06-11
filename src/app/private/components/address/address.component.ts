import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit{
user:any;
  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    this.userService.getUserDetails(userId!).subscribe(response=>
      this.user=response);
    
  }

constructor(private userService: UserService)
{}
}
