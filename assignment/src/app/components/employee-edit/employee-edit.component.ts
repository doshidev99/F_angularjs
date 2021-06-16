import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from './../../models/employee';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
import { DataService } from 'src/app/services/data.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  @Input('id')
  editId!: string;

  @Output()
  updateFinished: EventEmitter<string> = new EventEmitter<string>();


  isLoading: boolean = false;
  employee!: Employee;
  btnDisable: boolean = false;
  url = `http://localhost:3000/v1/api/employee`

  constructor(private modelService: NgbModal, private rest: RestApiService, private data: DataService) {
    this.employee = new Employee();
  }
  ngOnInit() {
    this.isLoading = true;
    this.rest.get(`${this.url}/${this.editId}`).then((data) => {
      this.employee = (data as { payload: Employee }).payload;
      this.isLoading = false;
    }).catch((err) => {
      this.data.error(err?.message);
    })
  }

  validate() {
    return true;
  }

  open(content: TemplateRef<any>) {
    this.data.message = ''
    this.modelService.open(content, { ariaDescribedBy: 'modal-basic-title' })
  }

  update() {
    this.btnDisable = true;

    if (this.validate()) {

      this.rest.put(`${this.url}`, this.editId, this.employee).then((data) => {
        this.btnDisable = false;
        this.updateFinished.emit('reFresh...');
        this.modelService.dismissAll();
        this.employee = new Employee();
        this.data.success('Employee saved')
      }).catch((err) => {
        this.data.error(err?.message);
        this.btnDisable = false
      })

    }
  }


}
