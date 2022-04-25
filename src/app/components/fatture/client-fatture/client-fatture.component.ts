import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { FattureService } from 'src/app/services/fatture.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-fatture',
  templateUrl: './client-fatture.component.html',
  styleUrls: ['./client-fatture.component.scss']
})
export class ClientFattureComponent implements OnInit {

  items!:any;
  pageNumber:number = 0;
  fatture!:any;
  clientId!:number;

  constructor(private fattureSrv:FattureService, private route:ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) =>{
      this.clientId = +params['id']
    }),
    this.loadFatture()
  }
  loadFatture(){
    this.fattureSrv.GetByCliente(this.clientId, this.pageNumber).subscribe(ris =>{
      this.items = ris
      this.fatture  = this.items.content
    })
  }
  onPageChanged(pageEvent:PageEvent){
    this.pageNumber = pageEvent.pageIndex
    this.loadFatture()
}

  detailFattura(id:number){
    this.fattureSrv.getByID(id)
  }
  deleteFattura(id:number, i:number){
    this.fattureSrv.delete(id).subscribe(()=>{
      this.fatture.splice(i, 1);
      Swal.fire('Fattura Eliminata')
    })
  }

}
