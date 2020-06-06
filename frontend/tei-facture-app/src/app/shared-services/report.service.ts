import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  serverApi="http://localhost:3000/api"
  constructor(private http:HttpClient ) { }

  //
  getFacture(idP):Observable<any>{
    return this.http.get(this.serverApi+"/report/facture/"+idP)
  }

  generateFactureNum():Observable<any>{
    return this.http.get(this.serverApi+"/tool/facture_get_number")
  }

  
  generateProforaNum():Observable<any>{
    return this.http.get(this.serverApi+"/tool/proforma_get_number")
  }

  postFacture(data):Observable<any>{
    return this.http.post(this.serverApi+"/report/facture/",data)
  }
  
  ///proforma
  getProforma(idP):Observable<any>{
    return this.http.get(this.serverApi+"/report/proforma/"+idP)
  }


  postProforma(data):Observable<any>{
    return this.http.post(this.serverApi+"/report/proforma/",data)
  }


  checkIfFactureExist(idP):Observable<any>{
    return this.http.get(this.serverApi+"/tool/check-facture-exist/"+idP)
  }
  
  checkIfProformaExist(idP):Observable<any>{
    return this.http.get(this.serverApi+"/tool/check-proforma-exist/"+idP)
  }


  checkNumFacture(num,idP):Observable<any>{
    return this.http.get(this.serverApi+"/tool/check-facture-number/"+num+"/"+idP)
  }
  
  checkNumProforma(num,idP):Observable<any>{
    return this.http.get(this.serverApi+"/tool/check-proforma-number/"+num+"/"+idP)
  }

  updateProforma(idP,obj):Observable<any>{
    return this.http.put(this.serverApi+"/report/proforma/"+idP,obj)
  }

  
  updateFacture(idP,obj):Observable<any>{
    return this.http.put(this.serverApi+"/report/facture/"+idP,obj)
  }
}
