import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReintegrationService {
  serverApi="http://localhost:3000/api"
  constructor(private http:HttpClient ) { }

  getAllReintegration():Observable<any>{
    return this.http.get(this.serverApi+"/reintegration");
  }

  postReintegration(reintegration):Observable<any>{
    return this.http.post(this.serverApi+"/reintegration",reintegration)
  }

  //todo
  getReintegrationOfProjet(id):Observable<any>{
    return this.http.get(this.serverApi+"/link/projet_reintegration/"+id)
  }

  updateReintegration(id,data):Observable<any>{
    return this.http.put(this.serverApi+"/reintegration/"+id,data)
  }

  //delete reintegration
  deleteReintegration(idD):Observable<any>{
    return this.http.delete(this.serverApi+"/reintegration/"+idD)
  }
}
