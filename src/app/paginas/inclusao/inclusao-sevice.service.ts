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
}
