import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { Client } from '../client.model';
import { ClientService } from 'src/app/shared-services/client.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.email,
  ]);
  moreDetail=true
  constructor(
    public dialogRef: MatDialogRef<ClientFormComponent>,
    private __clientService:ClientService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.onClose();
}

onClose() {
  this.dialogRef.close();
}
isChecked(c){
  this.moreDetail=!c
}

OnCreateClient(clientForm){
    if(!clientForm.valid){
      alert("Il faux donne les information necessaire")
      return
    }else{
      var data=clientForm.value
      //todo send to database 
      var client={
      "Nom_societe":data.nom_societe,
      "N_RC":data.nrc	,"MF":data.mf, 
      "Nif":data.nif	, "Nis":data.nis	,
      "adresse"	:data.adress,
      "tel":data.tel	,"fax":data.fax,
      "email":data.email,
      "do_bancaire":data.do_bancaire,
      "AI":data.AI,
      "capital_social":data.capital_social
    }	
      console.log(client);
      this.__clientService.posClient(client).
      subscribe(
        data=>{
        console.log(data)
        this.dialogRef.close();
      },err=>{
        alert('error on posting client')
      })
      
    }
}

}
