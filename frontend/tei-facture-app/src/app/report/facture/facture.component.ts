import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Projet } from 'src/app/mes-projet/projet.model';
import { Client } from 'src/app/mes-client/client.model';
import { MesInfo ,Facture} from '../report.model';
import { ProjectService } from 'src/app/shared-services/project.service';
import { ToolsService } from 'src/app/shared-services/tools.service';
import { Tach } from 'src/app/mes-produit/produit.model';
import { ReportService } from 'src/app/shared-services/report.service';
import { TacheService } from 'src/app/shared-services/tache.service';
import * as  writtenNumber from  'written-number';
import  param from '../../shared-data/parametre'
import  mode_payement from '../../shared-data/mode_payement'
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {
  projet:Projet=new Projet()
  client:Client=new Client()
  mesTach:Tach[]=[];
  mesInfo:MesInfo = new MesInfo();
  facture:Facture = new Facture();
  mode;
  yearFacture
  parametre=param
  total_string
  showProgress =false;
  hideUpdate=false
  constructor(private router:ActivatedRoute,
    private dialog:MatDialog,
    private __projetService:ProjectService,
    private __toolService:ToolsService,
    private __reportService:ReportService,
    private __tachService:TacheService) { }

  ngOnInit() {
    writtenNumber.defaults.lang = 'fr';
    // console.log(writtenNumber(200.51));
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
        this.mesTach=tachs
      })
      this.loadFacture()
      })
    })
    
  }

  loadFacture(){
    //load facture 
    this.__reportService.getFacture(this.projet.id_projet).subscribe(data=>{
      this.facture=data
      console.log(this.facture)   
      console.log(this.client)  
      this.mode = mode_payement [this.facture.mode_payement]
      this.yearFacture=this.facture.date_facture.substr(-4)

     })
  }

  locationsSum() {
    return this.mesTach.map(tag => round( tag.prix_u * tag.qt_real,2)).reduce((a, b) => a + b, 0);
  }

  convertDecimalToWord(){
    let num =this.locationsSum()*(1+this.parametre.tva)
    var integr = Math.floor(num)
    var decimal = round((num - integr),2)*100;
    if(decimal === 0) return  writtenNumber(integr)+" DA"
    return  writtenNumber(integr)+" DA et "+ writtenNumber(decimal)+" CTS"
  }

  onPrint(){
    window.print();
  }
  
  updateFacture(formData){
    console.log(formData.value)
    let ref = this.dialog.open(ConfirmDialogComponent)
    ref.afterClosed().subscribe(res=>{
      if(res == true){
        this.__reportService.checkNumFacture(formData.value.n_facture,this.projet.id_projet).subscribe(result=>{
          if(result == true) {alert("ce numero de facture exist deja");return;}
          this.__reportService.updateFacture(this.projet.id_projet,formData.value).subscribe(res=>{
            alert("update avec succe")
            this.hideUpdate =false
            this.loadFacture()
          })  
        })
         
      }
    })
      }
}

function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}