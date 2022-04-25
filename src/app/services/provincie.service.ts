import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Provincie } from '../models/provincie';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  URL = environment.pathApi

  constructor(private http:HttpClient) { }

  getAll(p:number){
    return this.http.get<any>(`${this.URL}/api/province?page=${p}&size=20&sort=id,ASC`);
  }
  newProvincia(data:any){
    return this.http.post(`${this.URL}/api/province`, data)
  }
  getByID(id:number){
    return this.http.get<Provincie>(`${this.URL}/api/province/${id}`)
  }
  delete(id: number) {
		return this.http.delete(`${this.URL}/api/province/${id}`);
	}
  saveProvincia(id:number, data:any){
    return this.http.put(`${this.URL}/api/province/${id}`, data)
  }
}
