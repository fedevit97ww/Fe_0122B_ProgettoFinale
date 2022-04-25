import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from 'src/app/auth/components/signup/signup.component';
import { AuthGuard } from 'src/app/auth/guard/auth.guard';
import { ModificaClienteComponent } from '../clienti/modifica-cliente/modifica-cliente.component';
import { NewClienteComponent } from '../clienti/new-cliente/new-cliente.component';
import { ComuniComponent } from '../comuni/comuni.component';
import { ModComuneComponent } from '../comuni/mod-comune/mod-comune.component';
import { NewComuneComponent } from '../comuni/new-comune/new-comune.component';
import { ClientFattureComponent } from '../fatture/client-fatture/client-fatture.component';
import { DetailsFattureComponent } from '../fatture/details-fatture/details-fatture.component';
import { NewFatturaComponent } from '../fatture/new-fattura/new-fattura.component';
import { ModProvinciaComponent } from '../provincie/mod-provincia/mod-provincia.component';
import { NewProvinciaComponent } from '../provincie/new-provincia/new-provincia.component';
import { ProvincieComponent } from '../provincie/provincie.component';
import { NavComponent } from './nav.component';

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: () =>
        import('../home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'users',
        canActivate: [AuthGuard],
        loadChildren:()=>
        import('../users/users.module').then((m) => m.UsersModule)
      },
      {
        path: 'clienti',
        canActivate: [AuthGuard],
        loadChildren:()=>
        import('../clienti/clienti.module').then((m) => m.ClientiModule)
      },
      {
        path:'new-customer',
        canActivate: [AuthGuard],
        component:NewClienteComponent
      },
      {
        path:'modifica-cliente/:id',
        canActivate: [AuthGuard],
        component:ModificaClienteComponent
      },
      {
        path: 'fatture',
        canActivate: [AuthGuard],
        loadChildren:()=>
        import('../fatture/fatture.module').then((m) => m.FattureModule)
      },
      {
        path:'fatture/:id',
        canActivate: [AuthGuard],
        component:DetailsFattureComponent
      },
      {
        path:'fatture/cliente/:id',
        canActivate: [AuthGuard],
        component:ClientFattureComponent
      },
      {
        path: 'new-fattura/cliente/:id',
        canActivate: [AuthGuard],
        component:NewFatturaComponent
      },
      {
        path:'signup',
        component:SignupComponent
      },
      {
        path:'province',
        canActivate: [AuthGuard],
        component:ProvincieComponent,
      },
      {
        path:'province/:id',
        canActivate: [AuthGuard],
        component:ModProvinciaComponent
      },
      {
        path:'new-provincia',
        canActivate: [AuthGuard],
        component:NewProvinciaComponent
      },
      {
        path:'comuni',
        canActivate: [AuthGuard],
        component:ComuniComponent,
      },
      {
        path:'comuni/:id',
        canActivate: [AuthGuard],
        component:ModComuneComponent
      },
      {
        path:'new-comune',
        canActivate: [AuthGuard],
        component:NewComuneComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavRoutingModule { }
