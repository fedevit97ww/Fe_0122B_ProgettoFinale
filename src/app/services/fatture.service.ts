import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Fatture } from '../models/fatture';
import { StatoFattura } from '../models/stato-fattura';

@Injectable({
  providedIn: 'root'
})
export class FattureService {

  constructor(private http:HttpClient) { }

  URL = environment.pathApi

  getAll(p:number){
    return this.http.get(`${this.URL}/api/fatture?page=${p}&size=20&sort=id,ASC`)
  }

  getByID(id:number){
    return this.http.get<Fatture>(`${this.URL}/api/fatture/${id}`)
  }

  GetByCliente(id: number, p: number) {
		return this.http.get<any>(`${this.URL}/api/fatture/cliente/${id}?page=${p}&size=20&sort=id,ASC`);
	}

  updateFattura(data:Fatture, id:number){
    return this.http.put(`${this.URL}/api/fatture/${id}`, data)
  }

  loadState(p:number){
    return this.http.get<any>(`${this.URL}/api/statifattura?page=${p}&size=20&sort=id,ASC`).pipe(
      map((ris:any)=>{
        return ris.content as StatoFattura[]
      })
    )
  }

  saveFattura(id:number, data:any){
    return this.http.put(`${this.URL}/api/fatture/${id}`, data)
  }

  delete(id: number) {
		return this.http.delete(`${this.URL}/api/fatture/${id}`);
	}

  newFattura(data:any){
    return this.http.post(`${this.URL}/api/fatture`, data)
  }
}
