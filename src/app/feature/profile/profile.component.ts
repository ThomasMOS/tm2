import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Profile } from 'src/app/core/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  user!: Profile;
  id!: string;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private userService: AuthService,
    private router: Router,
  ) {}

  initializeForm() {
    let space = this.user?.name?.indexOf(' ');

    let fname = this.user.name?.substring(0, space);
    let lname = this.user.name?.substring(space! + 1);

    console.log(lname + ' ' + fname);

    this.profileForm = this.formBuilder.group({
      first_name: [fname, Validators.required],
      last_name: [lname, Validators.required],
      email: [this.user?.email, Validators.required],
    });
  }
  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    let space = this.user?.name?.indexOf(' ');
    console.log(this.user.name?.substring(0, space));

    this.initializeForm();
  }

  get f() {
    return this.profileForm.controls;
  }

  onSubmit() {
    if (this.profileForm.valid) {
      console.log('intro', this.profileForm.value);

      console.log(this.user.id);

      let name = this.f['first_name'].value + ' ' + this.f['last_name'].value;
      let email = this.f['email'].value;

      console.log(email, name);

      this.userService.updateUser(name, email).subscribe((res: any) => {
        if (res['status'] === "SUCCESS") {
          let currentUser = JSON.stringify(res['user']);
          console.log(currentUser);
          localStorage.setItem('currentUser', currentUser);
          this.snackBar.open(res['message'], 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.router.navigateByUrl('/main/home');
        }
      });


    }
  }
}
