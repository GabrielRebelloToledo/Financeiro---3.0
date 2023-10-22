import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Dashboard } from './dashboard';




const API = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

 

  getAll(): Observable<Dashboard[]> {
    
    return this.http.get<Dashboard[]>(`${API}dashboard`);
  }
  getAllCartao(): Observable<Dashboard[]> {
    
    return this.http.get<Dashboard[]>(`${API}dashboard/cartao`);
  }
}
