import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Comuni } from 'src/app/models/comuni';
import { Provincie } from 'src/app/models/provincie';
import { ClientiService } from 'src/app/services/clienti.service';
import { Location } from '@angular/common';
import { ComuniService } from 'src/app/services/comuni.service';
import { ProvinceService } from 'src/app/services/provincie.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modifica-cliente',
  templateUrl: './modifica-cliente.component.html',
  styleUrls: ['./modifica-cliente.component.scss']
})
export class ModificaClienteComponent implements OnInit {

  id!: number;
	form!: FormGroup;
	cliente!: any;
	province!: Provincie[];
	comuni!: Comuni[];
	tipiclienti!: any[];

  constructor(private clientSrv:ClientiService, private location: Location, private fb:FormBuilder, private provinceSrv:ProvinceService, private comuniSrv:ComuniService, private route :ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) =>{
      this.id = +params['id']
      this.loadUsers()
    }),

    this.form = this.fb.group({
			ragioneSociale: new FormControl('', Validators.required),
			partitaIva: new FormControl('', Validators.required),
			email: new FormControl('', Validators.required),
			tipoCliente: new FormControl('', Validators.required),
			pec: new FormControl(''),
			telefono: new FormControl(''),
			nomeContatto: new FormControl(''),
			cognomeContatto: new FormControl(''),
			telefonoContatto: new FormControl(''),
			emailContatto: new FormControl('', Validators.required),
			indirizzoSedeOperativa: this.fb.group({
				via: new FormControl(''),
				civico: new FormControl(''),
				cap: new FormControl(''),
				localita: new FormControl(''),
				comune: this.fb.group({
					id: new FormControl ('',Validators.required),
					provincia:this.fb.group({
            id: new FormControl (''),
          })
				})
			}),
		});
    this.provinceSrv.getAll(0).subscribe(ris=> this.province = ris.content)
    this.comuniSrv.getAll(0).subscribe(ris=> this.comuni = ris.content)
    this.clientSrv.typeClienti().subscribe(ris=>{this.tipiclienti = ris})
  }

  loadUsers(){
    this.clientSrv.getbyId(this.id).subscribe(ris=>{
      this.cliente = ris
      console.log(this.cliente)
      this.form.controls['ragioneSociale'].patchValue(this.cliente.ragioneSociale);
      this.form.controls['partitaIva'].patchValue(this.cliente.partitaIva);
      this.form.controls['email'].patchValue(this.cliente.email);
      this.form.controls['tipoCliente'].patchValue(this.cliente.tipoCliente);
      this.form.controls['pec'].patchValue(this.cliente.pec);
      this.form.controls['telefono'].patchValue(this.cliente.telefono);
      this.form.controls['nomeContatto'].patchValue(this.cliente.nomeContatto);
      this.form.controls['cognomeContatto'].patchValue(this.cliente.cognomeContatto);
      this.form.controls['telefonoContatto'].patchValue(this.cliente.telefonoContatto);
      this.form.controls['emailContatto'].patchValue(this.cliente.emailContatto);
      const group:FormGroup = this.form.get('indirizzoSedeOperativa') as FormGroup
      group.controls['via'].patchValue(this.cliente.indirizzoSedeOperativa.via);
      group.controls['civico'].patchValue(this.cliente.indirizzoSedeOperativa.civico);
      group.controls['cap'].patchValue(this.cliente.indirizzoSedeOperativa.cap);
      group.controls['localita'].patchValue(this.cliente.indirizzoSedeOperativa.localita);
      const comuneGroup:FormGroup = group.get('comune') as FormGroup
      const provinciaGroup:FormGroup = comuneGroup.get('provincia') as FormGroup
      comuneGroup.controls['id'].patchValue(this.cliente.indirizzoSedeOperativa.comune.id);
      provinciaGroup.controls['id'].patchValue(this.cliente.indirizzoSedeOperativa.comune.provincia.id);
    })
  }

  onSubmit(DatiForm: { value: { indirizzoSedeOperativa: { comune: Comuni; }; }; }){
    this.comuni.forEach(item => {
      if (item.id == DatiForm.value.indirizzoSedeOperativa.comune.id){
        DatiForm.value.indirizzoSedeOperativa.comune = item
      }
    })
    this.clientSrv.updateClient(DatiForm.value, this.id).subscribe(ris=>{
      console.log(ris)
    })
    Swal.fire('Cliente Modificato')
    this.form.reset()
  }

  back(): void {
    this.location.back()
  }

}
