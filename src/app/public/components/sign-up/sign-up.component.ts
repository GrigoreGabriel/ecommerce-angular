import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { pipe, shareReplay, switchMap } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { UserModel } from 'src/app/private/models/user.model';
export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      return {
        passwordsDoNotMatch: true,
      };
    }
    return null;
  };
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  userUID: string = '';
  signUpForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    },
    { validators: passwordsMatchValidator() }
  );
  constructor(
    private authService: AuthService,
    private toast: HotToastService,
    private router: Router,
    private userService: UserService,
    private auth: Auth
  ) {}
  ngOnInit(): void {}

  get name() {
    return this.signUpForm.get('name');
  }
  get email() {
    return this.signUpForm.get('email');
  }
  get password() {
    return this.signUpForm.get('password');
  }
  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }
  submit() {
    if (!this.signUpForm.valid) {
      return;
    }
    const { name, email, password } = this.signUpForm.value;
    this.authService
      .signUp(name as string, email as string, password as string)
      .pipe(
        this.toast.observe({
          success: 'You have created an account!',
          loading: 'Signing in',
          error: ({ message }) => `${message}`,
        })
      )
      .subscribe(() => {
        var user = {
          name: name,
          email: email,
        };
        this.router.navigate(['/home']);
        this.userService.createUser(user).subscribe((createdUser) => {
          localStorage.setItem('userId', createdUser);
        });
      });
  }
}
