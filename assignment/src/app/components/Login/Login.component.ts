import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {

  employee!: Employee;
  btnDisable: boolean = false;
  url = `http://localhost:3000/v1/api/accounts/login`

  constructor(private router: Router, private rest: RestApiService, private data: DataService) {

    this.employee = new Employee()
  }
  ngOnInit() {
  }

  validate() {
    if (!Object.keys(this.employee)) return false;
    return true;
  }

  login() {
    this.btnDisable = true;

    if (this.validate()) {
      this.rest.post(this.url, this.employee).then(async(data) => {
        const value = (data as { token: string, message: string, _id: string });
        localStorage.setItem('token', value.token);
        await this.data.getMe();
        this.router.navigate(['/'])
      }).catch((err) => {
        this.data.error(err.error?.message);
        this.btnDisable = false
      })

    }
  }


}
