import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public showNav:boolean = false
  public showLoader:boolean = false;
  nome:any;
  constructor(private authSrv:AuthService, private loadingService:LoaderService) {}

  ngOnInit(): void {
    this.checkLog()
        this.loadingService.isLoading.subscribe(
      (isLoading:boolean) => {
        this.showLoader = isLoading
      }
    )
    this.getNome()
  }

  logout(){
    this.authSrv.logout()
  }
  checkLog(){
    if(this.authSrv.isLogged == false){
      this.showNav = false
    }else {this.showNav = true}
    console.log(this.authSrv.isLogged)
  }

  getNome(){
    let user:any = localStorage.getItem('user')
    this.nome = JSON.parse(user)
  }
}
