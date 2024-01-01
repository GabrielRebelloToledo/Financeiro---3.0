import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Categorias } from './categorias';




const API = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient) { }


  create(trasacoes: Categorias) {
    return this.http.post(`${API}categorias`, trasacoes).pipe(take(1));
  }
  getAll(): Observable<Categorias[]> {
    return this.http.get<Categorias[]>(`${API}categorias`);
  }

  delete(id :any) {

    return this.http.delete<Categorias[]>(`${API}categorias/${id}`);
  }

  getById(id:any) {
    if (!id) return EMPTY;
    return this.http.get<Categorias>(`${API}categorias/${id}`);
  }

  update(update:any, id:any) {

    return this.http.put(`${API}categorias/${id}`, update).pipe(take(1));
  }
}
