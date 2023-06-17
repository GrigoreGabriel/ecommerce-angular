import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  readonly apiUrl = 'https://localhost:7141/api/user';
  constructor() { }
}
