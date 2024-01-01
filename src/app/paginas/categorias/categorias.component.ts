import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriasService } from './categorias.service';
import { Categorias } from './categorias';
import { SnackBarComponent } from 'src/app/compartilhado/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css','../../font-awesome-4.7.0/css/font-awesome.min.css']
})
export class CategoriasComponent implements OnInit {

  formulario: FormGroup | any;
  cartaoCredito: boolean = false;
  listaCategoria: Categorias[] = [];

  listar: boolean = true;
  constructor(
    /* private location: Location, */
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private CategoriasService: CategoriasService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params
    .pipe(
      map((params: any) => params['id']),
      switchMap(id => this.CategoriasService.getById(id))
    )
    .subscribe(categoria => this.editarForm(categoria)
    );

    this.formulario = this.formBuilder.group({
      
      categoria: ['', Validators.required],
      tipo: ['', Validators.required],
      
    });
    this.pesquisaCategorias();
  }


  pesquisaCategorias() {
    this.CategoriasService.getAll().subscribe(result => { this.listaCategoria = result})
  }



  formul(i:any){
    if(i=="1"){
      
      this.listar = false;
    }
    if(i=="2"){
    
      this.listar = true;
    }
  }

  editarCategoria(id:any){
    this.router.navigate(['/categorias', id])
    this.listar = false;
  }

  editarForm(categoria: Categorias | any) {

    this.formulario.patchValue(
      {
        categoria: categoria[0].categoria,
        tipo: categoria[0].tipo

      }
    )

  }

  preencheCampos(categoria: Categorias) {
    this.formulario.patchValue(
      {
        categoria: categoria.categoria,
        tipo: categoria.tipo
      });

  } 

  deletarCategoria(id:any){
    if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      this.CategoriasService.delete(id).subscribe(
        (success: any) => {
          console.log(success)
          this.snackBar.openFromComponent(SnackBarComponent,{
            duration:3000,
            data:'Categoria deletada com sucesso!',
            horizontalPosition:'right',
            verticalPosition:'top'
            , panelClass: ['green-snack']
           
          })
          this.pesquisaCategorias()
        }
      )
    }
  }
submit() {

  console.log(this.formulario)
    if (this.route.snapshot.params['id']) {
      const atualizarAluno = this.formulario.getRawValue() as Categorias;
      
      this.CategoriasService.update(atualizarAluno, this.route.snapshot.params['id']).subscribe(
        (success: any) => {
          
          this.snackBar.openFromComponent(SnackBarComponent,{
            duration:3000,
            data:'Categoria atualizada com sucesso!',
            horizontalPosition:'right',
            verticalPosition:'top'
            , panelClass: ['green-snack']
           
          })
          this.pesquisaCategorias();
        }
      )
    } else {
      const novoAluno = this.formulario.getRawValue() as Categorias;
      this.CategoriasService.create(novoAluno).subscribe(
        (success: any) => {
          
          this.snackBar.openFromComponent(SnackBarComponent,{
            duration:3000,
            data:'Categoria incluída com sucesso!',
            horizontalPosition:'right',
            verticalPosition:'top'
            , panelClass: ['green-snack']
           
          })
          this.pesquisaCategorias();
        }
      )
    }
  } 
}
