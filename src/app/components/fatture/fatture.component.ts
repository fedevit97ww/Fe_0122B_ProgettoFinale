import { Component, OnInit } from '@angular/core';
import { FattureService } from 'src/app/services/fatture.service';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-fatture',
  templateUrl: './fatture.component.html',
  styleUrls: ['./fatture.component.scss']
})
export class FattureComponent implements OnInit {

  items!:any;
  pageNumber:number = 0
  fatture!:any

  constructor(private fattureSrv:FattureService) { }

  ngOnInit(): void {
    this.loadFatture()
  }

  loadFatture(){
    this.fattureSrv.getAll(this.pageNumber).subscribe(ris =>{
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
      Swal.fire('Fattura Eliminata')
      this.fatture.splice(i, 1);
    })
  }
}
