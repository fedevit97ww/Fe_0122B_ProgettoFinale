import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ProvinceService } from 'src/app/services/provincie.service';

@Component({
  selector: 'app-provincie',
  templateUrl: './provincie.component.html',
  styleUrls: ['./provincie.component.scss']
})
export class ProvincieComponent implements OnInit {

  pageNumber:number = 0
  province!:any
  items!:any;

  constructor(private provinceSrv:ProvinceService) { }

  ngOnInit(): void {
    this.loadProvince()
  }


  loadProvince(){
    this.provinceSrv.getAll(this.pageNumber).subscribe(ris =>{
      this.items = ris
      this.province  = this.items.content
    })
  }

  onPageChanged(pageEvent:PageEvent){
    this.pageNumber = pageEvent.pageIndex
    this.loadProvince()
  }

  detailProvincia(id:number){
    this.provinceSrv.getByID(id)
  }
  deleteProvincia(id:number, i:number){
    this.provinceSrv.delete(id).subscribe(()=>{
      this.province.splice(i, 1);
    })
  }

}
