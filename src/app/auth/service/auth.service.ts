import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService{

  constructor(private http:HttpClient, private router: Router) { }

  URL = environment.pathApi

  login(data: User){
    return this.http.post<User>(`${this.URL}/api/auth/login`, data)
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login'])
  }

  signup(data:User){
    return this.http.post<User>(`${this.URL}/api/auth/signup`, data)
  }

  get isLogged():boolean {
    return localStorage.getItem('user') != null
  }
}

