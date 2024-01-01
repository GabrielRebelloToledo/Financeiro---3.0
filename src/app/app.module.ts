import { LOCALE_ID, NgModule } from '@angular/core';
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
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { SnackBarComponent } from './compartilhado/snack-bar/snack-bar.component';

registerLocaleData(ptBr);

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};


@NgModule({
  declarations: [
    AppComponent,
    InclusaoComponent,
    MenuComponent,
    DashboardComponent,
    CategoriasComponent,
    CartaoCreditoComponent,
    ExtratoComponent,
    SnackBarComponent
  ],
  entryComponents:[SnackBarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    CurrencyMaskModule

  ],
  providers: [{ provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig}, {
    provide:LOCALE_ID , useValue: 'pt'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
