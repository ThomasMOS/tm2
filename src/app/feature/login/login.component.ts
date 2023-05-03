/*********************************************
 *
 * AUTHOR: THOMAS OWUSU
 * DATE CREATED: 28 APRIL 2023
 * DATE MODIFIED:
 * DESCRIPTION:login component allows user authentication based on the pair of
 *             email and password.
 *             Two input items are required in the template.
 *             Note that the second input has an attribute type="password",
 *             which instructs the browser to render a masked input element.
 *
 **********************************************/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getCurrentUser()
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    console.log('login pressed ');
    console.log('login pressed ');

    let email = this.f['email'].value;
    let password = this.f['password'].value;

    this.authService.login(email, password).subscribe((res) => {
      console.log(res['user']);
      if (res['message'] === 'Success') {
        let currentUser = JSON.stringify(res['user']);
        console.log(currentUser)
        localStorage.setItem('currentUser',currentUser );
        this.router.navigateByUrl('/main/home');
      } else {
        alert('Invalid details')
      }

    });
  }

  forgot() {
    this.router.navigate(['/', 'forgot-password']);
  }
  register() {
    alert('okay');
    this.router.navigateByUrl('/register');
  }
}
