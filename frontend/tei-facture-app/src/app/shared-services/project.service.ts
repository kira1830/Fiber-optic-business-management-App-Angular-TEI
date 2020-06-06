import { Injectable } from '@angular/core';
import { Projet } from '../mes-projet/projet.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  serverApi="http://localhost:3000/api"
  constructor(private httpClient:HttpClient) { }
 
  getAllProject():Observable<any>{
    return  this.httpClient.get(this.serverApi+"/projet") ;
  }

  postProjet(data):Observable<any>{
    return this.httpClient.post(this.serverApi+"/projet",data) ;
  }
 
  deleteProjet(id:number):Observable<any>{
    return this.httpClient.delete(this.serverApi+"/projet/"+id);
  }

  getProjetByid(id:number):Observable<any>{
    return this.httpClient.get(this.serverApi+"/projet/"+id)
  }

  updateProjet(id:number,newP):Observable<any>{
    return this.httpClient.put(this.serverApi+"/projet/"+id,newP)
  }

}
