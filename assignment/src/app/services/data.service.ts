import { Employee } from './../models/employee';
import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { RestApiService } from './rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  message = '';
  messageType = 'danger';
  employee!: Employee | null;

  constructor(private router: Router, private rest: RestApiService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.message = ''
      }
    })
  }

  async getMe() {
    try {
      if (localStorage.getItem('token')) {
        const url = `http://localhost:3000/v1/api/accounts/getMe`

        const data = await this.rest.get(url);
        this.employee = (data as { payload: Employee }).payload;

      }

    } catch (error) {

    }
  }

  error(message: string) {
    this.messageType = 'danger';
    this.message = message;
  }

  success(message: string) {
    this.messageType = 'success';
    this.message = message;
  }

  warning(message: string) {
    this.messageType = 'warning';
    this.message = message;
  }

}
