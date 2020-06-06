import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Projet } from 'src/app/mes-projet/projet.model';
import { Client } from 'src/app/mes-client/client.model';
import { MesInfo ,Proforma} from '../report.model';
import { ProjectService } from 'src/app/shared-services/project.service';
import { ToolsService } from 'src/app/shared-services/tools.service';
import { Tach } from 'src/app/mes-produit/produit.model';
import { ReportService } from 'src/app/shared-services/report.service';
import { TacheService } from 'src/app/shared-services/tache.service';
import * as  writtenNumber from  'written-number';
import  param from '../../shared-data/parametre'
import  mode_payement from '../../shared-data/mode_payement'
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-proforma',
  templateUrl: './proforma.component.html',
  styleUrls: ['./proforma.component.css']
})
export class ProformaComponent implements OnInit {
  projet:Projet=new Projet()
  client:Client=new Client()
  mesTach:Tach[]=[];
  mesInfo:MesInfo = new MesInfo();
  facture:Proforma = new Proforma();
  mode;
  yearFacture:any
  parametre=param
  facture_exist=false
  showProgress =false;
  hideUpdate=false
  constructor(private router:ActivatedRoute,
    private routerNav:Router,
    private __projetService:ProjectService,
    private __toolService:ToolsService,
    private __reportService:ReportService,
    private __tachService:TacheService,
    private datepipe:DatePipe,
    private dialog:MatDialog
    ) { }

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
      this.__tachService.getTachOfProjet(idP).subscribe(tachs=>{
        this.mesTach=tachs
      })
      this.loadFacture()
      })
    })
    
  }

  loadFacture(){
//load facture 
this.__reportService.getProforma(this.projet.id_projet).subscribe(data=>{
  this.facture=data
  console.log(this.facture)   
  console.log(this.client)  
  this.mode = mode_payement [this.facture.mode_payement]
  
  this.yearFacture=this.facture.date_proforma.substr(-4)
 // console.log(d)
  this.__reportService.checkIfFactureExist(this.projet.id_projet).subscribe(ress=>{
    this.facture_exist=ress
  })
 })
  }

  validateProforma(){
    let ref = this.dialog.open(ConfirmDialogComponent)
    ref.afterClosed().subscribe(reponce=>{
      if (reponce){
        this.__reportService.generateFactureNum().subscribe(data=>{
          var obj = {
            id_projet : this.projet.id_projet,
            n_facture : data,
            date_facture :  this.datepipe.transform(Date.now(), 'dd/MM/yyyy'),
            mode_payement:this.facture.mode_payement
          }
          this.__reportService.postFacture(obj).subscribe(res=>{
            this.routerNav.navigate([ '/MesProjet/projet/facture',this.projet.id_projet]);
          },err=>alert("error while creating facture"))
          console.log(obj)
        })
      }
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
        this.__reportService.checkNumProforma(formData.value.num_facture,this.projet.id_projet).subscribe(result=>{
          if(result == true) {alert("ce numero de facture exist deja");return;}
          this.__reportService.updateProforma(this.projet.id_projet,formData.value).subscribe(res=>{
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