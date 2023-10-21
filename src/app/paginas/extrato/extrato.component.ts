import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Transacoes } from '../inclusao/transacoes';
import { InclusaoSeviceService } from '../inclusao/inclusao-sevice.service';
@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.css','../../font-awesome-4.7.0/css/font-awesome.min.css']
})
export class ExtratoComponent implements OnInit {

  formulario: FormGroup | any;
  cartaoCredito: boolean = false;
  listaTransacoes: Transacoes[] = [];

  listar: boolean = true;
  constructor(
    /* private location: Location, */
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private TransacaoService: InclusaoSeviceService,

  ) { }

  ngOnInit(): void {
    this.pesquisaTransacao();
  }


  pesquisaTransacao() {
    this.TransacaoService.getAll().subscribe(result => { this.listaTransacoes = result})
  }

}