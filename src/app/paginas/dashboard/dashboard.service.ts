import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Dashboard } from './dashboard';
import { Meses } from './meses';




const API = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

 

  getAll(mes:any): Observable<Dashboard[]> {
    
    return this.http.get<Dashboard[]>(`${API}dashboard/totais/${mes}`);
  }
  getAllCartao(mes:any): Observable<Dashboard[]> {
    
    return this.http.get<Dashboard[]>(`${API}dashboard/cartao/${mes}`);
  }
  getAllCategorias(mes:any): Observable<Dashboard[]> {
    
    return this.http.get<Dashboard[]>(`${API}dashboard/categorias/${mes}`);
  }
  getAllCategoriasReceita(mes:any): Observable<Dashboard[]> {
    
    return this.http.get<Dashboard[]>(`${API}dashboard/categorias/receitas/${mes}`);
  }
  getAllMeses(): Observable<Meses[]> {
    
    return this.http.get<Meses[]>(`${API}dashboard/meses`);
  }
}
