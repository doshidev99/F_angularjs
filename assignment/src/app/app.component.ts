import { DataService } from 'src/app/services/data.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'assignment';
  constructor(private router: Router, public data: DataService) {
    this.data.getMe();
  }

  logout() {
    this.data.employee = null;
    localStorage.clear();
    this.router.navigate(['/login'])

  }
}
