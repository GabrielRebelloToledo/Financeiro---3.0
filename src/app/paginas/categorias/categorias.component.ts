import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriasService } from './categorias.service';
import { Categorias } from './categorias';

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
    private CategoriasService: CategoriasService

  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      
      categoria: ['', Validators.required],
      tipo: ['', Validators.required],
      
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


  formul(i:any){
    if(i=="1"){
      
      this.listar = false;
    }
    if(i=="2"){
    
      this.listar = true;
    }
  }

  editarCategoria(i:any){
    
  }
  deletarCategoria(i:any){

  }
submit() {

  console.log(this.formulario)
    if (this.route.snapshot.params['id']) {
      const atualizarAluno = this.formulario.getRawValue() as Categorias;
      
      this.CategoriasService.create(atualizarAluno).subscribe(
        (success: any) => {
          
          alert("Atualizado com Sucesso!")
          
        }
      )
    } else {
      const novoAluno = this.formulario.getRawValue() as Categorias;
      this.CategoriasService.create(novoAluno).subscribe(
        (success: any) => {
          
          alert("Incluído com Sucesso!")
          
        }
      )
    }
  } 
}
