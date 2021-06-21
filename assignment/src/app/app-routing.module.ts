import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { HomeComponent } from './components/Home/Home.component';
import { DetailEmployeeComponent } from './components/detail-employee/detail-employee.component';
import { LoginComponent } from './components/Login/Login.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';

const routes: Routes = [
  { path: 'projects/:id', component: ProjectDetailComponent },
  { path: 'projects', component: ProjectListComponent },
  { path: 'manage-employee/:id', component: DetailEmployeeComponent },
  { path: 'manage-employee', component: EmployeeListComponent },
  { path: 'employee-add', component: EmployeeAddComponent },
  { path: 'login', component:  LoginComponent },
  { path: '', component:  HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
