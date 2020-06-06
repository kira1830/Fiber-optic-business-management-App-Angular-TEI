import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  serverApi="http://localhost:3000/api"
  constructor(private http:HttpClient) { }

  getUnites():Observable<any>{
    return this.http.get(this.serverApi+"/tool/unite");
  }

  getMesInfo():Observable<any>{
    return this.http.get(this.serverApi+"/tool/tei");
  }

  updateMesInfo(data):Observable<any>{
    return this.http.put(this.serverApi+"/tool/tei",data);
  }

  
  postUnite(data):Observable<any>{
    return this.http.post(this.serverApi+"/tool/unite",data);
  }
  getTachCodeHint():Observable<any>{
    return this.http.get(this.serverApi+"/tool/tach_code_hint");
  }
}
