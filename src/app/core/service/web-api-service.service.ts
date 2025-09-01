import { Client } from '@/app/api/client';
import { environment } from '@/app/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {
  private http: HttpClient = inject(HttpClient);

  private client = new Client(this.http, environment.apiUrl);
  
  getService(){
    return this.client;
  }
}
