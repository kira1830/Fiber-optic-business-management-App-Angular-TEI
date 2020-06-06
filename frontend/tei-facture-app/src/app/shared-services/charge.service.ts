import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChargeService {
  serverApi="http://localhost:3000/api"
  constructor(private http:HttpClient) { }

  getAllProduit():Observable<any>{
    return this.http.get(this.serverApi+"/produit");
  }

  postProduit(produit):Observable<any>{
    return this.http.post(this.serverApi+"/produit",produit)
  }

  getProduitOfProjet(id):Observable<any>{
    return this.http.get(this.serverApi+"/link/projet_produit/"+id)
  }

  updateProduit(id,data):Observable<any>{
    return this.http.put(this.serverApi+"/produit/"+id,data)
  }
}
