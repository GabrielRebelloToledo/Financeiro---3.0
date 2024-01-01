import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InclusaoComponent } from './paginas/inclusao/inclusao.component';
import { MenuComponent } from './compartilhado/menu/menu.component';
import { DashboardComponent } from './paginas/dashboard/dashboard.component';
import { CategoriasComponent } from './paginas/categorias/categorias.component';
import { ExtratoComponent } from './paginas/extrato/extrato.component';

const routes: Routes = [
  {

    path: '',
    pathMatch: 'full',
    redirectTo: 'monitor-financeiro',
  },
  {
    path: 'inclusao',
    component: InclusaoComponent
  },
  {
    path: 'inclusao/:id',
    component: InclusaoComponent
  },
  {
    path: 'monitor-financeiro',
    component: DashboardComponent
  },
  {
    path: 'categorias',
    component: CategoriasComponent
  },
  {
    path: 'categorias/:id',
    component: CategoriasComponent
  },
  {
    path: 'extrato',
    component: ExtratoComponent
  },
];



@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
