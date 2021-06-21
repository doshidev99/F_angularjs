import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  project!: Project;
  url = `http://localhost:3000/v1/api/project`

  constructor(private route: ActivatedRoute, private rest: RestApiService, private data: DataService) {
  }

  ngOnInit() {

    const id = this.route.snapshot.params['id'];

    this.rest.get(`${this.url}/${id}`).then((data) => {
      this.project = (data as { payload: Project }).payload;

    }).catch((err) => {
      this.data.error(err?.message);
    })
  }

  formatDate(date: Date) {
    return new Date(date).toLocaleString('vi', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

}
