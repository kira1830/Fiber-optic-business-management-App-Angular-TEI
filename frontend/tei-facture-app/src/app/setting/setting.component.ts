import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../shared-services/tools.service';
import { MesInfo } from '../report/report.model';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  mesInfo:MesInfo=new MesInfo()
  constructor(private __toolService:ToolsService) { }

  ngOnInit() {
    this.__toolService.getMesInfo().subscribe(data=>{
      this.mesInfo = data
    })
  }

  valide(form){
    if(form.valide){
      alert("introduit tout les champs")
      return
    }
    
    this.__toolService.updateMesInfo(form.value).subscribe(res=>{
      alert("info MAJ avec succe")
    }, err=>alert("error "))
  }

}
