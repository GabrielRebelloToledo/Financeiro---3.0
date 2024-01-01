import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Transacoes } from '../inclusao/transacoes';
import { InclusaoSeviceService } from '../inclusao/inclusao-sevice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/compartilhado/snack-bar/snack-bar.component';
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
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    
  }


  pesquisaTransacao() {
    const dataIni = <HTMLInputElement>document.getElementById('data1')!;
    const dataFim = <HTMLInputElement> document.getElementById('data2')!;
    const valorDt1 = dataIni.value;
    const valorDt2 = dataFim.value;
  
    
    this.TransacaoService.getAll(valorDt1,valorDt2).subscribe(result => { this.listaTransacoes = result})
  }

  deletarTrasacao(id: any) {

    if (window.confirm('Tem certeza que deseja excluir esta trasação?')) {
      this.TransacaoService.delete(id).subscribe(

        (success: any) => {
          console.log(success)
          this.snackBar.openFromComponent(SnackBarComponent,{
            duration:3000,
            data:'Trasação deletada a com sucesso!',
            horizontalPosition:'right',
            verticalPosition:'top'
            , panelClass: ['green-snack']
           
          })
          this.pesquisaTransacao()
        }
      )
    }

  }
  editarTrasacao(id: any) {
    this.router.navigate(['/inclusao', id])
  }


  baixar(id:any){
    this.TransacaoService.updateBaixa(id).subscribe(

      (success: any) => {
        console.log(success)
        this.snackBar.openFromComponent(SnackBarComponent,{
          duration:3000,
          data:'Trasação baixada com sucesso!',
          horizontalPosition:'right',
          verticalPosition:'top'
          , panelClass: ['green-snack']
         
        })
        this.pesquisaTransacao()
      }
    )
  }

}