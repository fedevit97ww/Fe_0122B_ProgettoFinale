import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientiRoutingModule } from './clienti-routing.module';
import { NewClienteComponent } from './new-cliente/new-cliente.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModificaClienteComponent } from './modifica-cliente/modifica-cliente.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatButton, MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [
    NewClienteComponent,
    ModificaClienteComponent,
  ],
  imports: [
    CommonModule,
    ClientiRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    [SweetAlert2Module.forRoot()]
  ]
})
export class ClientiModule { }
