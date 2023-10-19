import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InclusaoComponent } from './paginas/inclusao/inclusao.component';
import { MenuComponent } from './compartilhado/menu/menu.component';
import { DashboardComponent } from './paginas/dashboard/dashboard.component';

const routes: Routes = [

  {
    path:'inclusao',
    component:InclusaoComponent
  },
  {
    path:'monitor-financeiro',
    component:DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
