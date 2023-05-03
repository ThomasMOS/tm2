import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AngularMaterialModule } from '../Material/angular-material.module';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule, AppRoutingModule, AngularMaterialModule],
  exports: [FooterComponent],
})
export class CoreModule {}
