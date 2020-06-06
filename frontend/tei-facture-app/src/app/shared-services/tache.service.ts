import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TacheService {
  serverApi="http://localhost:3000/api"
  constructor(private http:HttpClient) { }

  getAllBorduro():Observable<any>{
    return this.http.get(this.serverApi+"/tach");
  }

  getBorduro():Observable<any>{
    return this.http.get(this.serverApi+"/tach/borduro");
  }

  getMesTach():Observable<any>{
    return this.http.get(this.serverApi+"/tach/mesTach");
  }

  getBorduroWithPage(p1,p2):Observable<any>{
    return this.http.get(this.serverApi+"/tach/page/"+p1+"/"+p2);
  }

  countTach():Observable<any>{
    return this.http.get(this.serverApi+"/tach/count/");
  }

  postTach(tach):Observable<any>{
    return this.http.post(this.serverApi+"/tach",tach)
  }

  getTachOfProjet(id):Observable<any>{
    return this.http.get(this.serverApi+"/link/projet_tach/"+id)
  }

  updateTach(id,data):Observable<any>{
    return this.http.put(this.serverApi+"/tach/"+id,data)
  }

  deleteTach(id):Observable<any>{
    return this.http.delete(this.serverApi+"/tach/"+id)
  }
}
