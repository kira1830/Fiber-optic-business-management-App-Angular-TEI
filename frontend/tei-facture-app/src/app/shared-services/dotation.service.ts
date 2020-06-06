import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DotationService {
  serverApi="http://localhost:3000/api"
  constructor(private http:HttpClient ) { }

  getAllDotation():Observable<any>{
    return this.http.get(this.serverApi+"/dotation");
  }

  postDotation(dotation):Observable<any>{
    return this.http.post(this.serverApi+"/dotation",dotation)
  }

  //todo
  getDotationOfProjet(id):Observable<any>{
    return this.http.get(this.serverApi+"/link/projet_dotation/"+id)
  }

  updateDotation(id,data):Observable<any>{
    return this.http.put(this.serverApi+"/dotation/"+id,data)
  }

  //delete dotation
  deleteDotation(idD):Observable<any>{
    return this.http.delete(this.serverApi+"/dotation/"+idD)
  }
}
