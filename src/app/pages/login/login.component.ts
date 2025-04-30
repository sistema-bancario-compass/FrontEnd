import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    const formValue = this.loginForm.value;

    
    if (!formValue.username || !formValue.password) {
      if (!formValue.username) {
        this.username?.setErrors({ required: true });
      }
      if (!formValue.password) {
        this.password?.setErrors({ required: true });
      }
      return;
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!emailRegex.test(formValue.username)) {
      this.username?.setErrors({ emailRegexError: 'Please enter a valid email address' });
      return;
    }

    this.router.navigate(['/main-menu']);
  }
}