import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Tach } from 'src/app/mes-produit/produit.model';

import { ToolsService } from 'src/app/shared-services/tools.service';
import { TacheService } from 'src/app/shared-services/tache.service';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-tach-form-d',
  templateUrl: './tach-form-d.component.html',
  styleUrls: ['./tach-form-d.component.css']
})
export class TachFormDComponent implements OnInit {
  selectedTach:Tach=new Tach();
  unites;
  constructor( public dialogRef: MatDialogRef<TachFormDComponent>,
    private __toolService:ToolsService,
    private __tachService:TacheService,
    private dialog:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data:any
    ) { this.selectedTach =data}

 
  ngOnInit() {
   
   this.__toolService.getUnites().subscribe(data=>{
    this.unites=data
    })
  }
  onAdd(form){
    if(!form.valid){
      alert("il faux donne les information necessaire")
      return
    }
    let ref=this.dialog.open(ConfirmDialogComponent)
    ref.afterClosed().subscribe(res=>{
     if(res){
      var obj={
        designation:this.selectedTach.designation,
        prix_u:this.selectedTach.prix_u,
        unite:this.selectedTach.unite,
        code:this.selectedTach.code,
        chapitre:this.selectedTach.chapitre,
        type:this.selectedTach.chapitre
      }
  
      this.__tachService.postTach(obj).subscribe(data=>{
        alert("MAJ avec succe")
        this.dialogRef.close();
      },err=>alert("error"))
     }
    })
      }


  onUpdate(form){
    if(!form.valid){
      alert("il faux donne les information necessaire")
      return
    }
    var obj={
      code : this.selectedTach.code,
      designation:this.selectedTach.designation,
      prix_u:this.selectedTach.prix_u,
      unite:this.selectedTach.unite,
    }
    this.__tachService.updateTach(this.selectedTach.id,obj).subscribe(data=>{
      alert("MAJ avec succe")
      this.dialogRef.close();
    },err=> alert("error"))
  }

  onClose() {
    this.dialogRef.close();
  }
}
