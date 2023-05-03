import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthLayoutRoutingModule } from './auth-layout-routing.module';
import { AngularMaterialModule } from 'src/app/Material/angular-material.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthLayoutRoutingModule,
    AngularMaterialModule
  ]
})
export class AuthLayoutModule { }
