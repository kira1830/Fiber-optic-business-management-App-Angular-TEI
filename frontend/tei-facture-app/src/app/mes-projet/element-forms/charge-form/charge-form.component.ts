import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Produit } from 'src/app/mes-produit/produit.model';

import { ToolsService } from 'src/app/shared-services/tools.service';
import { TacheService } from 'src/app/shared-services/tache.service';
import { ChargeService } from 'src/app/shared-services/charge.service';

@Component({
  selector: 'app-charge-form',
  templateUrl: './charge-form.component.html',
  styleUrls: ['./charge-form.component.css']
})
export class ChargeFormComponent implements OnInit {
  selectedTach:Produit=new Produit();
  unites;
  constructor( public dialogRef: MatDialogRef<ChargeFormComponent>,
    private __toolService:ToolsService,
    private __chargeService:ChargeService,
    @Inject(MAT_DIALOG_DATA) public data:any
    ) { this.selectedTach =data}

 
  ngOnInit() {
   this.__toolService.getUnites().subscribe(data=>{
    this.unites=data
    })
  }

  onUpdate(form){
    if(!form.valid){
      alert("il faux donne les information necessaire")
      return
    }
    var obj={
      designation:this.selectedTach.designation,
      prix_u:this.selectedTach.prix_u,
      unite:this.selectedTach.unite,
    }
    this.__chargeService.updateProduit(this.selectedTach.id,obj).subscribe(data=>{
      alert("MAJ avec succe")
      this.dialogRef.close();
    },err=> alert("error"))
  }

  onClose() {
    this.dialogRef.close();
  }
}
