import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/feature/home/home.component';
import { PageNotFoundComponent } from '../../components/page-not-found/page-not-found.component';
import { EditTaskComponent } from 'src/app/feature/edit-task/edit-task.component';
import { ViewTaskComponent } from 'src/app/feature/view-task/view-task.component';
import { AddTaskComponent } from 'src/app/feature/add-task/add-task.component';
import { ProfileComponent } from 'src/app/feature/profile/profile.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'edit/:id', component: EditTaskComponent },
  { path: 'view/:id', component: ViewTaskComponent },
  { path: 'add', component: AddTaskComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '404', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainLayoutRoutingModule {}
