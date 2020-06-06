import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Projet } from 'src/app/mes-projet/projet.model';
import { Client } from 'src/app/mes-client/client.model';
import { MesInfo } from '../report.model';
import { ProjectService } from 'src/app/shared-services/project.service';
import { ToolsService } from 'src/app/shared-services/tools.service';
import {  Dotation } from 'src/app/mes-produit/produit.model';
import * as  writtenNumber from  'written-number';
import { DotationService } from 'src/app/shared-services/dotation.service';
import { AssociationService } from 'src/app/shared-services/association.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-reversement',
  templateUrl: './reversement.component.html',
  styleUrls: ['./reversement.component.css']
})
export class ReversementComponent implements OnInit {
  projet:Projet=new Projet()
  client:Client=new Client()
  mesDotation:Dotation[]=[];
  mesInfo:MesInfo = new MesInfo();
  showProgress =false;
  showHidden=true;
  modificationFaite:boolean[]=[]
  constructor(private router:ActivatedRoute,
    private __projetService:ProjectService,
    private __toolService:ToolsService,
    private __dotationService:DotationService,
    private dialog:MatDialog) { }

  ngOnInit() {
    writtenNumber.defaults.lang = 'fr';
     console.log(writtenNumber(200.51));
    this.showProgress=true
    this.router.paramMap.subscribe(params=>{
      var idP=+params.get("id")
      //load data of my project 
      this.__projetService.getProjetByid(idP).subscribe(data=>{
        this.projet=data;
        this.client=this.projet.client;
        console.log(this.projet)

      //load les info de mon societe
      this.__toolService.getMesInfo().subscribe(info=>{
          this.mesInfo=info
          this.showProgress = false
        })
      //load mes tach
      this.__dotationService.getDotationOfProjet(idP).subscribe(tachs=>{
        this.mesDotation=tachs
        for(var i = 0 ; i<this.mesDotation.length;i++)
           this.modificationFaite[i]=false
      })
     
      })
    })
    
  }
  updateItem(item:Dotation,i){
    var ref = this.dialog.open(ConfirmDialogComponent)
    ref.afterClosed().subscribe(ress=>{
      if(ress){
        var data={
          qt_final:item.quantite_final
        }
        this.__dotationService.updateDotation(item.id_dotation,data).subscribe(res=>{
        alert("MAJ faite avec succe")
        this.modificationFaite[i]=false
        },err=> alert("err in MAJ"))
        
      }
    })
    
  }
  onPrint(){
    window.print();
  }
}