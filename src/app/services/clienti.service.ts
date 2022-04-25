import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientiService {

  constructor(private http:HttpClient) { }

  URL = environment.pathApi

  getAll(p:number){
    return this.http.get(`${this.URL}/api/clienti?page=${p}&size=20&sort=id,ASC`)
  }
  getbyId(id:number){
    return this.http.get(`${this.URL}/api/clienti/${id}`)
  }
  delete(id: number) {
		return this.http.delete(`${this.URL}/api/clienti/${id}`);
	}
  saveClient(data:any){
    return this.http.post(`${this.URL}/api/clienti`, data)
  }
  updateClient(data:any, id:number){
    return this.http.put(`${this.URL}/api/clienti/${id}`, data)
  }
  typeClienti(){
    return this.http.get<any[]>(`${this.URL}/api/clienti/tipicliente`)
  }

}
