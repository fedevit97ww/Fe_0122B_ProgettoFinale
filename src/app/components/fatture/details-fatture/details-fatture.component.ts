import Swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FattureService } from 'src/app/services/fatture.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Fatture } from 'src/app/models/fatture';
import { StatoFattura } from 'src/app/models/stato-fattura';
import { Location } from '@angular/common';



@Component({
  selector: 'app-details-fatture',
  templateUrl: './details-fatture.component.html',
  styleUrls: ['./details-fatture.component.scss'],

})
export class DetailsFattureComponent implements OnInit {


  id!:number;
  fattura!:Fatture;
  statusFatture!: StatoFattura[];
  form!: FormGroup;

  constructor(private route:ActivatedRoute, private fattureSrv:FattureService, private fb: FormBuilder, private location:Location) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) =>{
      this.id = +params['id']
    }),

    this.form = this.fb.group({
      data: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required),
      anno: new FormControl('', Validators.required),
      importo: new FormControl('', Validators.required),
      stato: new FormControl(''),
    });

    this.loadFatture()
    this.currentState()
  }

  loadFatture(){
    this.fattureSrv.getByID(this.id).subscribe(ris =>{
      this.fattura = ris;
      console.log(this.fattura)
      this.form.controls['data'].patchValue(this.fattura.data.substr(0, 10));
      this.form.controls['numero'].patchValue(this.fattura.numero);
      this.form.controls['anno'].patchValue(this.fattura.anno);
      this.form.controls['importo'].patchValue(this.fattura.importo);
      this.form.controls['stato'].patchValue(this.fattura.stato.id);
    })
  }
  currentState(){
		this.fattureSrv.loadState(0).subscribe(
			(p) => {
				this.statusFatture = p
			}
		);
	}


  onSubmit(DatiForm: { value: { data: string; numero: number; anno: number; importo: number; stato: number; } }) {
    this.fattura.id = this.id
    this.fattura.data = DatiForm.value.data
    this.fattura.numero = DatiForm.value.numero
    this.fattura.anno = DatiForm.value.anno
    this.fattura.importo = DatiForm.value.importo
    this.fattura.stato.id = DatiForm.value.stato

    this.fattureSrv.saveFattura(this.id, this.fattura).subscribe(ris=>{
      console.log(ris)
    })
    Swal.fire('Stato fattura modificata')
    };

    back(): void {
      this.location.back()
    }
  }


