import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient) { }

  getHeaders() {
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders().set('Authorization', 'Bearer ' + token) : null;

  }
  get(link: string) {
    const headers = this.getHeaders();
    if (headers instanceof HttpHeaders)
      return this.http.get(link, { headers }).toPromise();
    return this.http.get(link).toPromise();
  }

  getById(link: string, id: string) {
    const headers = this.getHeaders();
    if (headers instanceof HttpHeaders)
      return this.http.get(`${link}/${id}`, { headers }).toPromise();
    return this.http.get(`${link}/${id}`).toPromise();
  }

  post(link: string, body: any) {
    const headers = this.getHeaders();
    if (headers instanceof HttpHeaders)
      return this.http.post(link, body, { headers }).toPromise();
    return this.http.post(link, body).toPromise();
  }

  put(link: string, id: string, body: any) {
    const headers = this.getHeaders();
    if (headers instanceof HttpHeaders)
      return this.http.put(`${link}/${id}`, body, { headers }).toPromise();
    return this.http.put(`${link}/${id}`, body).toPromise();
  }

  delete(link: string, id: string) {
    const headers = this.getHeaders();
    if (headers instanceof HttpHeaders)
      return this.http.delete(`${link}/${id}`, { headers }).toPromise();
    return this.http.delete(`${link}/${id}`).toPromise();
  }
}
