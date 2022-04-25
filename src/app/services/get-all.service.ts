import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetAllService {

  constructor(private http:HttpClient) { }

  URL = environment.pathApi

  getAll(p:number){
    return this.http.get(`${this.URL}/api/users?page=${p}&size=20&sort=id,ASC`)
  }
}
