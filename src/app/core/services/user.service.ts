import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly apiUrl="https://localhost:7141/api/user";
  constructor(private http:HttpClient) { }
}
