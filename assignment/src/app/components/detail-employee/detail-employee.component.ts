import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-detail-employee',
  templateUrl: './detail-employee.component.html',
  styleUrls: ['./detail-employee.component.css']
})
export class DetailEmployeeComponent implements OnInit {
  employee!: Employee;
  url = `http://localhost:3000/v1/api/employee`

  constructor(private route: ActivatedRoute, private rest: RestApiService, private data: DataService) {
  }

  ngOnInit() {

    const id = this.route.snapshot.params['id'];

    this.rest.get(`${this.url}/${id}`).then((data) => {
      this.employee = (data as { payload: Employee }).payload;

    }).catch((err) => {
      this.data.error(err?.message);
    })
  }

}
