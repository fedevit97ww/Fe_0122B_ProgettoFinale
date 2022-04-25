import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Comuni } from 'src/app/models/comuni';
import { Provincie } from 'src/app/models/provincie';
import { ComuniService } from 'src/app/services/comuni.service';
import { ProvinceService } from 'src/app/services/provincie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mod-comune',
  templateUrl: './mod-comune.component.html',
  styleUrls: ['./mod-comune.component.scss'],
})
export class ModComuneComponent implements OnInit {
  id!: number;
  comune!: Comuni;
  province!: Provincie[];
  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private location: Location,
    private comuniSrv: ComuniService,
    private provinceSrv: ProvinceService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
    }),
      (this.form = this.fb.group({
        nome: new FormControl('', Validators.required),
        provincia: this.fb.group({
          id: new FormControl('', Validators.required),
        }),
      }));
    this.provinceSrv
      .getAll(0)
      .subscribe((ris) => (this.province = ris.content));
    this.loadComuni();
  }

  onSubmit(DatiForm: { value: { nome: string; provincia: Provincie } }) {
    this.comune = { nome: '', provincia: { id: 0 } };
    this.comune.nome = DatiForm.value.nome;
    this.comune.provincia = DatiForm.value.provincia;
    this.comuniSrv.updateComune(this.id, this.comune).subscribe();
    Swal.fire('Comune Modificato')
    this.form.reset();
  }

  loadComuni() {
    this.comuniSrv.getByID(this.id).subscribe((ris) => {
      this.comune = ris;
      this.form.controls['nome'].patchValue(this.comune.nome);
      this.form.controls['provincia'].patchValue(this.comune.provincia);
    });
  }

  back(): void {
    this.location.back();
  }
}
