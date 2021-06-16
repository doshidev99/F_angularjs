import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from 'src/app/models/employee';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';



@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  @Output()

  employees!: Employee[];
  employee!: Employee;

  btnDisable: boolean = false;
  url = `http://localhost:3000/v1/api/employee`

  constructor(private rest: RestApiService, private data: DataService, private modalService: NgbModal) {
    this.employee = new Employee()
  }

  ngOnInit() {
    this.data.message = '';
    this.btnDisable = true;

    this.rest.get(this.url).then((data) => {
      this.employees = (data as { payload: Employee[] }).payload;
      this.btnDisable = false;
    }).catch((err) => {
      this.data.error(err?.message);
      this.btnDisable = false
    })
  }

  finished(message: string) {
    // effect re-render
    this.ngOnInit();
  }


  validate() {
    return true;
  }

  save() {
    this.btnDisable = true;

    if (this.validate()) {
      this.rest.post(this.url, this.employee).then((data) => {
        this.btnDisable = false;
        this.ngOnInit();
        this.data.success('Employee saved')
      }).catch((err) => {
        this.data.error(err?.message);
        this.btnDisable = false
      })
    }
  }

  delete(id: string) {
    this.rest.delete(this.url, id).then((data) => {
      this.btnDisable = false;
      this.ngOnInit();
      this.data.success((data as { message: string }).message);
    }).catch((err) => {
      this.data.error(err?.message);
      this.btnDisable = false
    })
  }

}
