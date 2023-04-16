import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit
{
  user$=this.authService.currentUser$;
constructor(private authService:AuthService){

}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
