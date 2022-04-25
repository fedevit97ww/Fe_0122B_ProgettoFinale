import { Location } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Comuni } from 'src/app/models/comuni';
import { Provincie } from 'src/app/models/provincie';
import { ComuniService } from 'src/app/services/comuni.service';
import { ProvinceService } from 'src/app/services/provincie.service';

@Component({
  selector: 'app-new-comune',
  templateUrl: './new-comune.component.html',
  styleUrls: ['./new-comune.component.scss']
})
export class NewComuneComponent implements OnInit {

  form!: FormGroup;
  comuni!:Comuni;
  province!: Provincie[];

  constructor(private location:Location, private fb: FormBuilder, private provincieSrv:ProvinceService, private comuniSrv:ComuniService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: new FormControl('', Validators.required),
      provincia:this.fb.group({
        id: new FormControl ('', Validators.required),
      })
    });
    this.provincieSrv.getAll(0).subscribe(ris=> this.province = ris.content)
  }


  back(): void {
    this.location.back()
  }

  onSubmit(DatiForm: {value :  {nome: string ; provincia : Provincie}}){
    this.comuni = { nome: '', provincia: {id:0} };
    this.comuni.nome = DatiForm.value.nome
    this.comuni.provincia = DatiForm.value.provincia
    console.log(DatiForm.value)
    this.comuniSrv.saveComune(this.comuni).subscribe()
    alert('Comune Aggiunto')
    this.form.reset()
  }

}
