import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comuni } from '../models/comuni';

@Injectable({
  providedIn: 'root'
})
export class ComuniService {

  URL = environment.pathApi

  constructor(private http:HttpClient) { }

  getAll(p:number){
    return this.http.get<any>(`${this.URL}/api/comuni?page=${p}&size=20&sort=id,ASC`);
  }
  newComune(data:any){
    return this.http.post(`${this.URL}/api/comuni`, data)
  }
  getByID(id:number){
    return this.http.get<Comuni>(`${this.URL}/api/comuni/${id}`)
  }
  delete(id: number) {
		return this.http.delete(`${this.URL}/api/comuni/${id}`);
	}
  saveComune(data:any){
    return this.http.post(`${this.URL}/api/comuni`, data)
  }
  updateComune(id:number,data:any, ){
    return this.http.put(`${this.URL}/api/comuni/${id}`, data)
  }
}
