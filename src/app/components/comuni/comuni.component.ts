import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ComuniService } from 'src/app/services/comuni.service';

@Component({
  selector: 'app-comuni',
  templateUrl: './comuni.component.html',
  styleUrls: ['./comuni.component.scss']
})
export class ComuniComponent implements OnInit {

  pageNumber:number = 0
  comuni!:any
  items!:any;

  constructor(private comuniSrv:ComuniService) { }

  ngOnInit(): void {
    this.loadProvince()
  }


  loadProvince(){
    this.comuniSrv.getAll(this.pageNumber).subscribe(ris =>{
      this.items = ris
      this.comuni  = this.items.content
    })
  }

  onPageChanged(pageEvent:PageEvent){
    this.pageNumber = pageEvent.pageIndex
    this.loadProvince()
  }

  detailComune(id:number){
    this.comuniSrv.getByID(id)
  }
  deleteComune(id:number, i:number){
    this.comuniSrv.delete(id).subscribe(()=>{
      this.comuni.splice(i, 1);
    })
  }

}
