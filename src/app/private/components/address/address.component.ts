import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  user: any;
  userId: any;
  formGroup!: FormGroup;
  success: boolean = false;
  constructor(private userService: UserService,
    private fb: FormBuilder) { }
  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.userService.getUserDetails(this.userId).subscribe(response =>
      this.user = response);
    this.initForm();
  }
  initForm() {
    this.formGroup = this.fb.group({
      'userId': [this.userId],
      'city': [''],
      'country': [''],
      'region': [''],
      'addressLine': [''],
      'userPhoneNumber': [''],
      'postalCode': [''],
    });
  }
  saveChanges() {
    const formValues = this.formGroup.value;
    Object.keys(formValues).forEach(key => {
      if (formValues[key] === '') {
        delete formValues[key];
      }
    });
    this.userService.updateUserDetails(this.formGroup.value).subscribe(response => {
      if (response.status == 200) {
        this.success = true;
        setTimeout(() => {
          this.success = false;
        }, 3000);
      }
    }
    );
  }
}
