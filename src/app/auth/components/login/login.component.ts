import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  user!: User;

  constructor(
    private fb: FormBuilder,
    private authSrv: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    this.form.controls['username'].setValue('');
    this.form.controls['password'].setValue('');
  }

  onSubmit(DatiForm: { value: User }) {
    this.authSrv.login(DatiForm.value).subscribe((risposta) => {
      this.user = risposta;
      localStorage.setItem('user', JSON.stringify(this.user));
      this.router.navigate(['/']);
    });
  }
}
