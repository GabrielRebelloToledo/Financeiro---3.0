import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Transacoes } from './transacoes';




const API = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class InclusaoSeviceService {

  constructor(private http: HttpClient) { }


  create(trasacoes: Transacoes) {
    return this.http.post(`${API}transacao`, trasacoes).pipe(take(1));
  }

  getAll(dt1:any,dt2:any): Observable<Transacoes[]> {
    return this.http.get<Transacoes[]>(`${API}transacao/${dt1}/${dt2}`);
  }

  delete(id :any) {

    return this.http.delete<Transacoes[]>(`${API}transacao/${id}`);
  }
  getById(id:any) {
    if (!id) return EMPTY;
    return this.http.get<Transacoes>(`${API}transacao/${id}`);
  }
  update(update:any, id:any) {
    console.log(update)
    return this.http.put(`${API}transacao/${id}`, update).pipe(take(1));
  }
  updateBaixa(id:any) {
    return this.http.put(`${API}transacao/updateTitulo/${id}`,[]).pipe(take(1));
  }
}
