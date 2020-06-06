import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssociationService {
  serverApi="http://localhost:3000/api"
  constructor(private http:HttpClient) { }
//////////////////afaire///////////////
  link_projet_tach(data):Observable<any>{
    return this.http.post(this.serverApi+"/link/projet_tach",data)
  }
  //update tach quantite for project 
  updateTachQt(idP,idT,data):Observable<any>{
    return this.http.put(this.serverApi+"/link/projet_tach/"+idP+"/"+idT,data);
  }
  //unlink tach to project 
  unlink_projet_tach(idP,idT):Observable<any>{
    return this.http.delete(this.serverApi+"/link/projet_tach/"+idP+"/"+idT);
  }

  //////////////Consomation //////////////////:
  link_projet_produit(data):Observable<any>{
    return this.http.post(this.serverApi+"/link/projet_produit",data)
  }
  //update produit quantite for project 
  updateProduitQt(data):Observable<any>{
    return this.http.put(this.serverApi+"/link/projet_produit/",data);
  }
  //unlink produit to project 
  unlink_projet_produit(idP,idT):Observable<any>{
    return this.http.delete(this.serverApi+"/link/projet_produit/"+idP+"/"+idT);
  }

  

}
