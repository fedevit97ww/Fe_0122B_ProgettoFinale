import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ClientiService } from 'src/app/services/clienti.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.scss']
})
export class ClientiComponent implements OnInit {

  items!:any;
  pageNumber:number = 0
  clienti!:any


  constructor(private clientSrv:ClientiService) { }

  ngOnInit(): void {
    this.loadClients()
  }

  loadClients(){
    this.clientSrv.getAll(this.pageNumber).subscribe(ris =>{
      this.items = ris
      this.clienti  = this.items.content
    })
  }
  onPageChanged(pageEvent:PageEvent){
      this.pageNumber = pageEvent.pageIndex
      this.loadClients()
  }
  deleteCliente(id:number, i:number){
    this.clientSrv.delete(id).subscribe(()=>{
      this.clienti.splice(i, 1);
      Swal.fire('Cliente eliminato')
    })

  }

}
