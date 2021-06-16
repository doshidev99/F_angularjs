import { ProjectListComponent } from './components/project-list/project-list.component';
import { DetailEmployeeComponent } from './components/detail-employee/detail-employee.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MessageComponent } from './components/message/message.component';
import { RestApiService } from './services/rest-api.service';
import { DataService } from './services/data.service';
import { HomeComponent } from './components/Home/Home.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { LoginComponent } from './components/Login/Login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MessageComponent,
    EmployeeListComponent,
    EmployeeAddComponent,
    EmployeeEditComponent,
    DetailEmployeeComponent,
    ProjectListComponent
   ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [RestApiService, DataService], //declare service
  bootstrap: [AppComponent]
})
export class AppModule { }
