import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Transacoes } from './transacoes';
import { InclusaoSeviceService } from './inclusao-sevice.service';
import { Categorias } from '../categorias/categorias';
import { CategoriasService } from '../categorias/categorias.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/compartilhado/snack-bar/snack-bar.component';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-inclusao',
  templateUrl: './inclusao.component.html',
  styleUrls: ['./inclusao.component.css']
})
export class InclusaoComponent implements OnInit {

  formulario: FormGroup | any;
  cartaoCredito: boolean = false;
  value: any;
  listaCategoria: Categorias[] = [];

  constructor(
    /* private location: Location, */
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private TransacaoService: InclusaoSeviceService,
    private CategoriasService: CategoriasService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.route.params
      .pipe(
        map((params: any) => params['id']),
        switchMap(id => this.TransacaoService.getById(id))
      )
      .subscribe(transacao => this.editarForm(transacao)
      );


    this.formulario = this.formBuilder.group({
      tipoLancamento: ['', Validators.required],
      categoria: ['', Validators.required],
      tipotransacao: ['', Validators.required],
      parcelas: ['', Validators.required],
      cartao: ['', Validators.required],
      dataTransacao: ['', Validators.required],
      dataPPagamento: ['', Validators.required],
      valor: ['', Validators.required],
      historico: ['', Validators.required],
      pago_recebido: ['', Validators.required],
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
    }else{
      
      this.cartaoCredito = false;
    }
  }

  editarForm(transacao: Transacoes | any) {

    this.formulario.patchValue(
      {
        id: transacao[0].id,
        tipoLancamento: transacao[0].tipoLancamento,
        categoria: transacao[0].categoria,
        tipotransacao: transacao[0].tipotransacao,
        parcelas: transacao[0].parcelas,
        cartao: transacao[0].cartao,
        dataTransacao: transacao[0].dataTransacao,
        dataPPagamento: transacao[0].dataPPagamento,
        valor: transacao[0].valor,
        historico: transacao[0].historico
      }
    )

  }

  preencheCampos(transacao: Transacoes) {
    this.formulario.patchValue(
      {
        tipoLancamento: transacao.tipoLancamento,
        categoria: transacao.categoria,
        tipotransacao: transacao.tipotransacao,
        parcelas: transacao.parcelas,
        cartao: transacao.cartao,
        dataTransacao: transacao.dataTransacao,
        dataPPagamento: transacao.dataPPagamento,
        valor: transacao.valor,
        historico: transacao.historico
      });

  } 



  
submit() {

    if (this.route.snapshot.params['id']) {
      const atualizarAluno = this.formulario.getRawValue() as Transacoes;
      this.TransacaoService.update(atualizarAluno, this.route.snapshot.params['id']).subscribe(
        (success: any) => {
          this.snackBar.openFromComponent(SnackBarComponent,{
            duration:3000,
            data:'Trasação atualizada com sucesso!',
            horizontalPosition:'right',
            verticalPosition:'top'
            , panelClass: ['green-snack']
           
          })
          this.router.navigate(['/inclusao/', success.data])
         
          
        }
      )
    } else {
      const novoAluno = this.formulario.getRawValue() as Transacoes;
      this.TransacaoService.create(novoAluno).subscribe(
        (success: any) => {
          
          this.snackBar.openFromComponent(SnackBarComponent,{
            duration:3000,
            data:'Trasação incluída com sucesso!',
            horizontalPosition:'right',
            verticalPosition:'top'
            , panelClass: ['green-snack']
           
          })
          this.router.navigate(['/inclusao/', success.data])
        }
      )
    }
  } 
}
