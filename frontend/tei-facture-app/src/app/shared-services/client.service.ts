import { Injectable } from '@angular/core';
import { Client } from '../mes-client/client.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private httpReq:HttpClient) { }
  serverApi="http://localhost:3000/api"
  getAllClient():Observable<any>{
    return this.httpReq.get(this.serverApi+"/client");
  }

  deleteClient(id):Observable<any>{
    return this.httpReq.delete(this.serverApi+"/client/"+id);
  }

  getClient(id):Observable<any>{
    return this.httpReq.get(this.serverApi+"/client/"+id);
  }

  posClient(client:any):Observable<any>{
     return this.httpReq.post(this.serverApi+"/client",client);
  }

  updateClient(id,client:any):Observable<any>{
    return this.httpReq.put(this.serverApi+"/client/"+id,client);
 }

  getProjectOfClient(id):Observable<any>{
    ///client_projet/:id
    return  this.httpReq.get(this.serverApi+"/link/client_projet/"+id);
  }

}
