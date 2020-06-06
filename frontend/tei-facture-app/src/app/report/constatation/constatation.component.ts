import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Projet } from 'src/app/mes-projet/projet.model';
import { Client } from 'src/app/mes-client/client.model';
import { MesInfo ,Facture} from '../report.model';
import { ProjectService } from 'src/app/shared-services/project.service';
import { ToolsService } from 'src/app/shared-services/tools.service';
import { Tach } from 'src/app/mes-produit/produit.model';
import { TacheService } from 'src/app/shared-services/tache.service';
import { AssociationService } from 'src/app/shared-services/association.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-constatation',
  templateUrl: './constatation.component.html',
  styleUrls: ['./constatation.component.css']
})
export class ConstatationComponent implements OnInit {
    projet:Projet=new Projet()
    client:Client=new Client()
    mesTach:Tach[]=[];
    mesInfo:MesInfo = new MesInfo();
    quntiteModifier:boolean[]=[]
   
    total_string
    showProgress =false;
    constructor(private router:ActivatedRoute,
      private __projetService:ProjectService,
      private __toolService:ToolsService,
      private __tachService:TacheService,
      private __associationService:AssociationService,
      private dialog: MatDialog) { }
  
    ngOnInit() {
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
        this.__tachService.getTachOfProjet(idP).subscribe(tachs=>{
          for (var i=0;i<this.mesTach.length;i++) this.quntiteModifier.push(false)
          this.mesTach=tachs
          console.log( this.mesTach)
        })
      
        })
      })
      
    }

    onPrint(){
      window.print();
    }
 
    updateItem(item:Tach,i){
      var ref = this.dialog.open(ConfirmDialogComponent)
      ref.afterClosed().subscribe(ress=>{
        if(ress){
          var obj ={
            qt_real : item.qt_real
          }
          this.__associationService.updateTachQt(this.projet.id_projet,item.id,obj).subscribe(res=>{
            alert("donne ajeoute avec succe")
            this.quntiteModifier[i]=false
          },err=>{
            alert("error while updating data")
          })
          
        }
      })
    
    }
}
  