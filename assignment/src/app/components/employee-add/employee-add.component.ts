import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {

  employee!: Employee;
  btnDisable: boolean = false;
  url = `http://localhost:3000/v1/api/employee`

  constructor(private rest: RestApiService, private data: DataService) {

    this.employee = new Employee()
  }
  ngOnInit() {
  }

  validate() {
    if (!Object.keys(this.employee)) return false;
    return true;
  }

  save() {
    this.btnDisable = true;

    if (this.validate()) {
      this.rest.post(this.url, this.employee).then((data) => {
        this.btnDisable = false;
        this.data.success('Employee saved')
      }).catch((err) => {
        this.data.error(err?.message);
        this.btnDisable = false
      })

    }
  }

}
