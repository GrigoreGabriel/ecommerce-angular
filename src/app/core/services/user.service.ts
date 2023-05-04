import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { UserModel } from 'src/app/private/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly apiUrl = 'https://localhost:7141/api/user';
  constructor(private http: HttpClient) {}
  createUser(data:any){
    return this.http.post(this.apiUrl+'/createUser',data);
  }
}
