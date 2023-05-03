import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/core/helper/must-match.validator';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  signupForm!: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  get f() {
    return this.signupForm.controls;
  }

  signup() {
    console.log('signup pressed ');
    this.submitted = true;

  
      let email = this.f['email'].value;
      let name = this.f['firstName'].value+ ' '  + this.f['lastName'].value; 
      let password = this.f['password'].value;
  
      this.authService.register(name, email, password).subscribe(res => {
        console.log(res)
      });
      this.router.navigateByUrl('');
    
  }

  onReset() {
    this.submitted = false;
    this.signupForm.reset();
  }

  login() {
    alert('okay')
    this.router.navigateByUrl('/login')
  }
}