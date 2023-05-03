import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../Material/angular-material.module';
import { CoreModule } from '../core/core.module';
import { ViewTaskComponent } from './view-task/view-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { HttpClientModule } from '@angular/common/http';
import { AddTaskComponent } from './add-task/add-task.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
  declarations: [HomeComponent, LoginComponent, RegisterComponent, ViewTaskComponent, EditTaskComponent, AddTaskComponent, ProfileComponent, EditProfileComponent],
  imports: [CommonModule, ReactiveFormsModule, AngularMaterialModule, CoreModule, HttpClientModule],
  exports: [],
})
export class FeatureModule {}
