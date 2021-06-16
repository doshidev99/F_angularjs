import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/models/project';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects!: Project[];
  project!: Project;
  btnDisable: boolean = false;
  url = `http://localhost:3000/v1/api/project`
  constructor(private rest: RestApiService, private data: DataService, private modalService: NgbModal) {
    this.project = new Project()
  }

  ngOnInit() {
    this.data.message = '';
    this.btnDisable = true;

    this.rest.get(this.url).then((data) => {
      this.projects = (data as { payload: Project[] }).payload;
      this.btnDisable = false;
    }).catch((err) => {
      this.data.error(err?.message);
      this.btnDisable = false
    })
  }

}
