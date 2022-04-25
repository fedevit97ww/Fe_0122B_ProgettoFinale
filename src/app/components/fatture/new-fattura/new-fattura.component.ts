import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FattureService } from 'src/app/services/fatture.service';
import { Location } from '@angular/common';
import { Fatture } from 'src/app/models/fatture';
import { StatoFattura } from 'src/app/models/stato-fattura';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-new-fattura',
  templateUrl: './new-fattura.component.html',
  styleUrls: ['./new-fattura.component.scss']
})
export class NewFatturaComponent implements OnInit {

  id!:number;
  fattura!:Fatture;
  statusFatture!: StatoFattura[];
  form!: FormGroup;

  constructor(private fattureSrv:FattureService, private fb: FormBuilder, private location:Location, private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe((params) =>{
      this.id = +params['id']
    }),

    this.form = this.fb.group({
      data: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required),
      anno: new FormControl('', Validators.required),
      importo: new FormControl('', Validators.required),
      stato: new FormControl('',Validators.required ),
    });
    this.currentState()
    console.log()
  }

  currentState(){
		this.fattureSrv.loadState(0).subscribe(
			(p) => {
				this.statusFatture = p
			}
		);
	}

  onSubmit(DatiForm: { value: { data: string; numero: number; anno: number; importo: number; stato: number; }}) {
    this.fattura = { numero: 0, anno: 0, data: '', importo: 0, stato: { id: 0 }, cliente: {id:0} };
    this.fattura.data = DatiForm.value.data
    this.fattura.numero = DatiForm.value.numero
    this.fattura.anno = DatiForm.value.anno
    this.fattura.importo = DatiForm.value.importo
    this.fattura.stato.id = Number(DatiForm.value.stato)
    this.fattura.cliente.id = this.id
    console.log(this.fattura)
    this.fattureSrv.newFattura(this.fattura).subscribe(ris=>{
      console.log(ris)
    })
    };

    back(): void {
      this.location.back()
    }

}
