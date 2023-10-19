import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { InclusaoComponent } from './paginas/inclusao/inclusao.component';
import { MenuComponent } from './compartilhado/menu/menu.component'
import { MaterialModule } from './material/material.module';
import { DashboardComponent } from './paginas/dashboard/dashboard.component';
import { CategoriasComponent } from './paginas/categorias/categorias.component';
import { CartaoCreditoComponent } from './paginas/cartao-credito/cartao-credito.component';
import { ExtratoComponent } from './paginas/extrato/extrato.component';
@NgModule({
  declarations: [
    AppComponent,
    InclusaoComponent,
    MenuComponent,
    DashboardComponent,
    CategoriasComponent,
    CartaoCreditoComponent,
    ExtratoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
