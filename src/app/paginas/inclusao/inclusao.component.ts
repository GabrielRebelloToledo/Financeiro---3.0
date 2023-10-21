import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Transacoes } from './transacoes';
import { InclusaoSeviceService } from './inclusao-sevice.service';
import { Categorias } from '../categorias/categorias';
import { CategoriasService } from '../categorias/categorias.service';

@Component({
  selector: 'app-inclusao',
  templateUrl: './inclusao.component.html',
  styleUrls: ['./inclusao.component.css']
})
export class InclusaoComponent implements OnInit {

  formulario: FormGroup | any;
  cartaoCredito: boolean = false;

  listaCategoria: Categorias[] = [];

  constructor(
    /* private location: Location, */
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private TransacaoService: InclusaoSeviceService,
    private CategoriasService: CategoriasService
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      tipoLancamento: ['', Validators.required],
      categoria: ['', Validators.required],
      tipotransacao: ['', Validators.required],
      cartao: ['', Validators.required],
      dataTransacao: ['', Validators.required],
      valor: ['', Validators.required],
      historico: ['', Validators.required],
    });

    this.pesquisaCategorias();
  }


  pesquisaCategorias() {
    this.CategoriasService.getAll().subscribe(result => { this.listaCategoria = result})
  }


  onSelectChange(event: any): void {
    // Você pode acessar o novo valor selecionado usando event.target.value
    const novoValorSelecionado = event.target.value;
    /* console.log(`Novo valor selecionado: ${novoValorSelecionado}`); */
    // Faça o que for necessário com o novo valor aqui

    if(novoValorSelecionado == 4){
      this.cartaoCredito = true;
      /* console.log(`Novo valor selecionado1: ${novoValorSelecionado}`); */
    }else{
      this.cartaoCredito = false;
    }
  }
submit() {

  console.log(this.formulario)
    if (this.route.snapshot.params['id']) {
      const atualizarAluno = this.formulario.getRawValue() as Transacoes;
      
      this.TransacaoService.create(atualizarAluno).subscribe(
        (success: any) => {
          
          alert("Atualizado com Sucesso!")
          
        }
      )
    } else {
      const novoAluno = this.formulario.getRawValue() as Transacoes;
      this.TransacaoService.create(novoAluno).subscribe(
        (success: any) => {
          
          alert("Incluído com Sucesso!")
          
        }
      )
    }
  } 
}
