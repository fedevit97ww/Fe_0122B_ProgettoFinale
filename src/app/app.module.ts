import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptor } from './auth/interceptor/token.interceptor';
import { ClientiComponent } from './components/clienti/clienti.component';
import { UsersComponent } from './components/users/users.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FattureComponent } from './components/fatture/fatture.component';
import { NavComponent } from './components/nav/nav.component';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { NavModule } from './components/nav/nav.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HomeModule } from './components/home/home.module';
import { UsersModule } from './components/users/users.module';
import { ClientiModule } from './components/clienti/clienti.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FattureModule } from './components/fatture/fatture.module';
import { LoaderInterceptor } from './auth/interceptor/loader.interceptor';
import { LoaderComponent } from './components/loader/loader.component';
import { ProvincieComponent } from './components/provincie/provincie.component';
import { NewProvinciaComponent } from './components/provincie/new-provincia/new-provincia.component';
import { ModProvinciaComponent } from './components/provincie/mod-provincia/mod-provincia.component';
import { ComuniComponent } from './components/comuni/comuni.component';
import { NewComuneComponent } from './components/comuni/new-comune/new-comune.component';
import { ModComuneComponent } from './components/comuni/mod-comune/mod-comune.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ClientiComponent,
    UsersComponent,
    FattureComponent,
    NavComponent,
    LoaderComponent,
    ProvincieComponent,
    NewProvinciaComponent,
    ModProvinciaComponent,
    ComuniComponent,
    NewComuneComponent,
    ModComuneComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    NavModule,
    MatToolbarModule,
    MatIconModule,
    HomeModule,
    UsersModule,
    ClientiModule,
    MatCardModule,
    MatFormFieldModule,
    FattureModule,
    MatCardModule,
    [SweetAlert2Module.forRoot()]
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
