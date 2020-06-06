import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/shared-services/client.service';
import { Client } from 'src/app/mes-client/client.model';
import { MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import { ClientFormComponent } from 'src/app/mes-client/client-form/client-form.component';
import { DatePipe } from '@angular/common';
import {  Router } from '@angular/router';
import { ProjectService } from 'src/app/shared-services/project.service';

@Component({
  selector: 'app-projet-form',
  templateUrl: './projet-form.component.html',
  styleUrls: ['./projet-form.component.css']
})
export class ProjetFormComponent implements OnInit {
  societe_name="Algerie telecome"
  list_client:Client[]=null
  selected_client:Client=null
  constructor(private __clientService:ClientService,
    private __projectService:ProjectService,
    private dialog: MatDialog,
    private  datepipe: DatePipe,
    private router:Router) { }
  
  ngOnInit() {
    this.refrech_clients();
  }

  refrech_clients(){
   
      this.__clientService.getAllClient().subscribe((data:Client[])=>{
        console.log(data)
        this.list_client=data
      });
  }

 ajouteClient(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "90%";
    let dialogRef=this.dialog.open(ClientFormComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(res=>{
      this.refrech_clients()
    })
 }

 OnCreateProject(form){
    console.log(form.valid)
    if(!form.valid  || this.selected_client==null){
       alert("vous devez remplir tous les champs requis")
        return
    } 
  
    else{
         var date:string=this.datepipe.transform(form.value.datePicker.toString(), 'dd/MM/yyyy')
         var date2:string=this.datepipe.transform(form.value.dateOds.toString(), 'dd/MM/yyyy')

    //  console.log(date)
      var data=form.value
      let projet = {
      N_ODS :data.NODS,
      N_BNC :data.NBNC,
      Designation	:data.nom_projet,
      Date_debut:date,
      date_ods:date2,
      delais:data.delais,
      Description :data.description,
      adress	: data.adress,
      ID_SOCIETE:this.selected_client.id_societe
    }
      console.log(projet)
      this.__projectService.postProjet(projet).subscribe(res=>{
        this.router.navigateByUrl('/MesProjet')
      },err=>{
        alert ("error while creating your peoject")
      })
     
    }
   
  }


}
