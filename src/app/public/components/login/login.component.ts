import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('maverick.boss@yahoo.com', [Validators.required, Validators.email]),
    password: new FormControl('1234567', Validators.required)
  })
  constructor(
    private authService: AuthService,
    private router:Router,
    private toast:HotToastService) {

  }
  ngOnInit(): void { }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  submit() {
    if (!this.loginForm.valid) {
      return;
    }
    const { email, password } = this.loginForm.value;
    this.authService.login(email as string ,password as string).pipe(this.toast.observe({
      success:'Logged in successfully',
      loading:'Logging in',
      error:'Bad credentials'
    })).subscribe(()=>{
      this.router.navigate(['/home']);
    });

  }
}

