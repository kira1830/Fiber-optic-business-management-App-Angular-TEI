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

@Component({
  selector: 'app-dotation',
  templateUrl: './dotation.component.html',
  styleUrls: ['./dotation.component.css']
})
export class DotationComponent implements OnInit {
  projet:Projet=new Projet()
  client:Client=new Client()
  mesDotation:Dotation[]=[];
  mesInfo:MesInfo = new MesInfo();
  showProgress =false;
  constructor(private router:ActivatedRoute,
    private __projetService:ProjectService,
    private __toolService:ToolsService,
    private __dotationService:DotationService) { }

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
      })
     
      })
    })
    
  }

  onPrint(){
    window.print();
  }
}