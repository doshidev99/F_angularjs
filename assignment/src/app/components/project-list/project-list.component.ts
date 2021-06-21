import { Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
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
  isLoading: boolean = false;
  defaultStartDate: string = '';
  idProject!: string;
  currentPage: number = 1;

  url = `http://localhost:3000/v1/api/project`

  constructor(private modelService: NgbModal,
    private rest: RestApiService,
    private data: DataService,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.project = new Project()

  }

  ngOnInit() {
    this.data.message = '';
    this.btnDisable = true;
    this.isLoading = true;

    this.rest.get(this.url).then((data) => {
      this.projects = (data as { payload: Project[] }).payload;
      this.btnDisable = false;
      this.isLoading = false;
    }).catch((err) => {
      this.data.error(err?.message);
      this.btnDisable = false
      this.isLoading = false;
    })
  }

  toggle(content: TemplateRef<any>) {
    this.data.message = ''
    this.modelService.open(content, { ariaDescribedBy: 'modal-basic-title' })
  }

  open(content: TemplateRef<any>, id: string) {
    this.data.message = ''
    this.modelService.open(content, { ariaDescribedBy: 'modal-basic-title' })

    this.idProject = id;
    this.rest.get(`${this.url}/${id}`).then((data) => {
      this.project = (data as { payload: Project }).payload;
      this.isLoading = false;

    }).catch((err) => {
      this.data.error(err?.message);
    })
  }

  validate() {
    if (!Object.keys(this.project)) return false;
    return true;
  }

  add() {
    this.btnDisable = true;

    if (this.validate()) {
      this.rest.post(this.url, this.project).then((data) => {
        const value = (data as { message: string, payload: Project });
        this.projects.unshift(value.payload);
        this.btnDisable = false;
        this.modelService.dismissAll();
        this.data.success(value.message)
      }).catch((err) => {
        this.data.error(err?.message);
        this.btnDisable = false
      })

    }
  }

  update() {
    this.btnDisable = true;

    if (this.validate()) {
      this.rest.put(this.url, this.idProject, this.project).then((data) => {
        const value = (data as { message: string, payload: Project });
        this.modelService.dismissAll();
        this.btnDisable = false;
        this.ngOnInit();
        this.data.success(value.message)
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
  finished(message: string) { }
  save() { }

  formatDate(date: Date) {
    return new Date(date).toLocaleString('vi', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

}
