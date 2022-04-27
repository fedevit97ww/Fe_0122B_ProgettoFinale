import { Location, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Provincie } from 'src/app/models/provincie';
import { ProvinceService } from 'src/app/services/provincie.service';

@Component({
  selector: 'app-new-provincia',
  templateUrl: './new-provincia.component.html',
  styleUrls: ['./new-provincia.component.scss']
})
export class NewProvinciaComponent implements OnInit {

  form!: FormGroup;
  provincia!:Provincie;

  constructor(private location:Location, private fb: FormBuilder, private provinceSrv:ProvinceService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: new FormControl('', Validators.required),
      sigla: new FormControl('', Validators.required),
    });
  }


  back(): void {
    this.location.back()
  }

  onSubmit(DatiForm:any){
    this.provincia = {nome:'', sigla:''}
    this.provincia.nome = DatiForm.value.nome
    this.provincia.sigla = DatiForm.value.sigla
    this.provinceSrv.newProvincia(this.provincia).subscribe()
    
    this.form.reset()
  }
}
