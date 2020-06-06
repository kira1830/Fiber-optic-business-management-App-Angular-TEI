import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../shared-services/tools.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-unite-form',
  templateUrl: './unite-form.component.html',
  styleUrls: ['./unite-form.component.css']
})
export class UniteFormComponent implements OnInit {

  constructor(private __toolService:ToolsService,
    public dialogRef: MatDialogRef<UniteFormComponent>) { }

  ngOnInit() {
  }

  onAddUnite(value){
    var obj={
      unite:value
    }
    this.__toolService.postUnite(obj).subscribe(data=>{
      this.dialogRef.close()
    },err=>{
      alert("error while adding unite")
    })
  }

}
