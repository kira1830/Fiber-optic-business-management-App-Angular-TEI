import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../client.model';
import { ClientService } from 'src/app/shared-services/client.service';
import { Projet } from 'src/app/mes-projet/projet.model';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-client-env',
  templateUrl: './client-env.component.html',
  styleUrls: ['./client-env.component.css']
})
export class ClientEnvComponent implements OnInit {
  client:Client=new Client()
  listProjet:Projet[]=[]
  isEdit=false
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

 
  
  constructor(private router:ActivatedRoute,
   private  __clientService:ClientService,
   private dialog: MatDialog) { }
   moreDetail=true
  ngOnInit() {

    this.router.paramMap.subscribe(params=>{
     
      let id=+params.get("id");
      this.__clientService.getClient(id).subscribe((data:Client)=>{
        this.client=data
        console.log(this.client)
        this.int_list_projet(id)
      },err=>{
        alert("error in projet get")
      })  
    })

  
  }
  int_list_projet(id){
    this.__clientService.getProjectOfClient(id).subscribe(data=>{
      this.listProjet=data
      console.log(this.listProjet)
    })
  }
  isChecked(c){
    this.moreDetail=!c
  }

  OnUpdateClient(clientForm){
    if (!clientForm.valid){
      alert("il faux donne tout les champs")
      return
    }
    let ref = this.dialog.open(ConfirmDialogComponent)
    ref.afterClosed().subscribe(res=>{
      if(res){
        this.__clientService.updateClient(this.client.id_societe,clientForm.value).subscribe(data=>{
          alert("update avec succe")
          this.disableEdit()
        },err=>{
          alert("error while updating")
        })
      }
    })
  
  }
  disableEdit(){
    this.isEdit=!this.isEdit
  }
}
