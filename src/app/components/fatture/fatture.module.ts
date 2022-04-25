import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FattureRoutingModule } from './fatture-routing.module';
import { DetailsFattureComponent } from './details-fatture/details-fatture.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewFatturaComponent } from './new-fattura/new-fattura.component';
import { ClientFattureComponent } from './client-fatture/client-fatture.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import {  MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    DetailsFattureComponent,
    NewFatturaComponent,
    ClientFattureComponent
  ],
  imports: [
    CommonModule,
    FattureRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    [SweetAlert2Module.forRoot()]

  ]
})
export class FattureModule { }
