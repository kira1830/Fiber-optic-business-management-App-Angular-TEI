import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/shared-services/project.service';
import { Projet } from '../projet.model';
import { Tach,Produit, Dotation, Reintegration } from 'src/app/mes-produit/produit.model';
import { TachFormDComponent } from '../../mes-produit/tach-table/tach-form-d/tach-form-d.component';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { ToolsService } from 'src/app/shared-services/tools.service';
import { FormControl } from '@angular/forms';
import { TacheService } from 'src/app/shared-services/tache.service';
import { AssociationService } from 'src/app/shared-services/association.service';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { UniteFormComponent } from 'src/app/unite-form/unite-form.component';
import { ChargeService } from 'src/app/shared-services/charge.service';
import { DotationService } from 'src/app/shared-services/dotation.service';
import  param from '../../shared-data/parametre'
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ReportService } from 'src/app/shared-services/report.service';
import { DatePipe } from '@angular/common';
import { ChargeFormComponent } from '../element-forms/charge-form/charge-form.component';
import { ReintegrationService } from 'src/app/shared-services/reintegration.service';


@Component({
  selector: 'app-projet-env',
  templateUrl: './projet-env.component.html',
  styleUrls: ['./projet-env.component.css']
})
export class ProjetEnvComponent implements OnInit,AfterViewInit  {
  myControl = new FormControl();
  filtred_list:Tach[]=[]
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions;
  choixRecherch=false
  isBorduro = false  
  mesReintegration: Reintegration[]=[];
  reintegrationSpiner: boolean=false;
  private _filter(value: string): Tach[] {
  // console.log(value)
    const filterValue = value  
    if (this.choixRecherch)
      return this.list_Borduro.filter(option =>  option.code.includes(filterValue));
   
      return this.list_Borduro.filter(option => option.designation.includes(filterValue) );
       
  }

  filter(value:string){
    const filterValue = value 
    if (this.choixRecherch)
      this.filtred_list= this.list_Borduro.filter(option =>  option.code === filterValue);
   
      this.filtred_list= this.list_Borduro.filter(option => option.designation.toLowerCase().includes(filterValue) );
      
  }



  //donne de projet
  projet:Projet=new Projet();
  list_Borduro:Tach[];
  unites;
  date_debut = null;

  //donne de tach 
  mesTach:Tach[]=[]

  selectedTach:Tach=new Tach() //dans le tableau 
  tachChoisie:Tach=new Tach() // dans le autocomplite list 
  choixTach: true | false = false;
  codeHint:string=""
  //donne de charge 
  mesCharge:Produit[]=[]

  //donne de dotation 
  mesDotation: Dotation[]=[]
  

  //facture 
  facture_exist = false

  //controle de form
  isEdit=false
  Auto_complite_tach_Control = new FormControl();
  hideHint=true
  allPageSpiner = true
  dotationSpiner = true;
  tachSpiner = true;
  chargeSppiner= true;
  parametre=param
 

  //constructeur
  constructor(
    private router:ActivatedRoute,
    private routerNav:Router,
    private __projetService:ProjectService,
    private dialog: MatDialog,
    private __toolService:ToolsService,
    private __tachService:TacheService,
    private __associationService:AssociationService,
    private _snackBar: MatSnackBar,
    private __chargeService:ChargeService,
    private __dotationService:DotationService,
    private __reportService:ReportService,
    private __reintegrationService:ReintegrationService,
    private datePipe:DatePipe 
    ) {}

  //initialisation de la page 
  ngOnInit() {
    console.log("ngOnInit")
    this.router.paramMap.subscribe(params=>{
      this.tachSpiner=true 
      let id=+params.get("id");
      this.__projetService.getProjetByid(id).subscribe((data:Projet)=>{
        this.projet=data
        this.__reportService.checkIfFactureExist(this.projet.id_projet).subscribe(res=>{
          this.facture_exist= res
        })
        this.date_debut= new FormControl(new Date(this.projet.Date_debut))
        this.int_list_tach()
      },err=>{
        this.tachSpiner=false
        alert("error in projet get")
      })  
    })
    this.refrechCode()
  }


goProforma(){
  this.__reportService.checkIfProformaExist(this.projet.id_projet).subscribe(res=>{
    if (res == 0){
      this.__reportService.generateProforaNum().subscribe((num:number)=>{

        var obj ={
          id_projet : this.projet.id_projet,
          date_proforma:this.datePipe.transform(Date.now(),"dd/MM/yyyy"),
          num_facture : num
        }
        this.__reportService.postProforma(obj).subscribe(res=>{},err=>{alert("error while generating proforma")})
      }) 

    }
    this.routerNav.navigate(['/MesProjet/projet/proforma/',this.projet.id_projet])
  },err=>alert("error while creating proforma"))
  
}

  //tool to calculate 
  locationsSum() {
    return this.mesTach.map(tag => round( tag.prix_u * tag.quantite,2)).reduce((a, b) => a + b, 0);
  }

  refrechCode(){
    this.__toolService.getTachCodeHint().subscribe(data=>{
      this.codeHint ="z-"+data
    })
  }
  ngAfterViewInit() {
   
    console.log("ngAgterView")
    this.init_tach_form()
  }


//desacive la modification des information de projet
   disableEdit(){
    this.isEdit=!this.isEdit
     
  }

//update project info
  editprojet(projetEditForm){
    if(!projetEditForm.valid){
      alert("remplire tout les champs")
      return
    }
   this.__projetService.updateProjet(this.projet.id_projet,projetEditForm.value).subscribe(data=>{
    alert("Projet a etait modifier")
    this.disableEdit()
    },err=>{
      alert("error")
    })
   
  }

  
  onAddUnite(){
    let ref=this.dialog.open(UniteFormComponent)
    ref.afterClosed().subscribe(data=>{
      if (!data)
          this.int_unite_list()
    })
  }

  int_unite_list(){
    //get  all unite
    this.__toolService.getUnites().subscribe(data=>{
      this.unites=data
    },err=>{
      alert("server can't give list of unites")
    })
  }

OnTAbSelected(event){

    switch(event.index){
      case 1 :{
        this.chargeSppiner = true
        this.__chargeService.getProduitOfProjet(this.projet.id_projet).subscribe(data=>{
          this.mesCharge=data;
          this.chargeSppiner = false
        },err=>{
          this.chargeSppiner = false
          alert("error in getting produit")
        })
        break;
      }
      case 2 :{
        this.dotationSpiner = true
        this.__dotationService.getDotationOfProjet(this.projet.id_projet).subscribe(data=>{  
          this.mesDotation=data;
          this.dotationSpiner = false
        },err=>{
          this.dotationSpiner = false
          alert("error in getting Dotation")
        })
        break;
      }
      case 3 :{
        this.reintegrationSpiner = true
        this.__reintegrationService.getReintegrationOfProjet(this.projet.id_projet).subscribe(data=>{  
          this.mesReintegration=data;
          this.reintegrationSpiner = false
        },err=>{
          this.reintegrationSpiner = false
          alert("error in getting Reintegration")
        })
        break;
      } 

    }


      //console.log(event)
  }
  //////////////////////////////TACH METHOD////////////////////////////////////
  //initialisation du tach form 
  init_tach_form(){
     //get all list Borduro
     this.__tachService.getAllBorduro().subscribe(data=>{
      this.list_Borduro=data
      this.tachSpiner=false;
      this.filtred_list=this.list_Borduro
      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    },err=>{
      alert("server can't give list of borduro")
    })
    this.int_unite_list()
    
  }

  //get associeted tach
  int_list_tach(){
   // console.log(this.projet.id_projet)
    this.__tachService.getTachOfProjet(this.projet.id_projet).subscribe(data=>{
      this.mesTach=data 
    },err=>{
      alert("server can't give list of mes projet")
    })
  }
  

  //check code 
  checkCode(code) {
    var isExist=this.list_Borduro.some(r => r.id === code); 
    if (isExist){
      this.__toolService.getTachCodeHint().subscribe(data=>{
        this.codeHint ="z"+data
      })
      this._snackBar.open("code exist deja","Hide", {
        duration: 2000,
      });
      this.hideHint=false
      return true
    }else {
      this.hideHint=true
      return false
    }
     
  }
  
  //ajoute une tach
  onAddTach(tachForm){
    if(!tachForm.valid){
      alert("il faux donne toute les info")
      return
    }
    var tach:Tach=new Tach()
    //if it is existing tach
    if (!this.choixTach){
      var isExist=this.mesTach.some(r => r.id === this.tachChoisie.id);
      if (isExist){
        let id_tach = this.tachChoisie.id
        let id_projet=this.projet.id_projet
        var quantiteObj={
          qt:tachForm.value.quantite,
        }
        this.__associationService.updateTachQt(id_projet,id_tach,quantiteObj).subscribe(data=>{
          alert("set deja exist la quantite est MAJ");
          this.int_list_tach()
        })
        return
      } 
      tach.prix_u=this.tachChoisie.prix_u
      tach.quantite=tachForm.value.quantite
      tach.unite=this.tachChoisie.unite
      tach.designation=this.tachChoisie.designation
      tach.code = this.tachChoisie.code
      tach.id=this.tachChoisie.id
      tach.borduro = this.tachChoisie.borduro
      var linkData={
        id_tach:tach.id,
        id_projet:this.projet.id_projet,
        qt:tach.quantite
      }
      this.__associationService.link_projet_tach(linkData).subscribe(data=>{
          this.mesTach.push(tach)
      })
    }//if it is new tach
    else{
      var isExist=this.mesTach.some(r => r.id === tachForm.value.id_tach);
      if ( this.checkCode(tachForm.value.code)&&isExist){
        return
      } 

      tach.designation=tachForm.value.designation;
      tach.unite=tachForm.value.unite
      tach.prix_u=+(Math.round( tachForm.value.prix_u* 100) / 100).toFixed(2);
      tach.quantite=tachForm.value.quantite
      tach.id=this.codeHint
      if (tachForm.value.isBorduro )  tach.borduro = 1
      else  tach.borduro = 0
      var obj={
        code:this.codeHint,
        designation:tach.designation,
        prix_u:tach.prix_u,
        unite:tach.unite,
        borduro:tach.borduro
      }

      this.__tachService.postTach(obj).subscribe(data=>{
        var id_tach=data.insertId
        var linkData={
          id_tach : id_tach,
          id_projet:this.projet.id_projet,
          qt:tach.quantite
        }

        this.__associationService.link_projet_tach(linkData).subscribe(data2=>{
          this.mesTach.push(tach)
          alert("tach ajouter avec succe")
          this.refrechCode()
        },err=> alert("error while adding"))
        
      },err=>{
        alert("error while adding")
      })
    }
 
  }

 

  select_to_modifierCharge(produit:Produit){
    console.log(produit)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.data=produit
    let ref = this.dialog.open(ChargeFormComponent,dialogConfig
      );
      ref.afterClosed().subscribe(data=>{
      })
  }
  
  select_to_modifierTach(produit:Tach){
    console.log(produit)
    console.log(produit)
    if(produit.borduro === 1 ) produit.mode=0


    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.data=produit
    let ref = this.dialog.open(TachFormDComponent,dialogConfig
      );
      ref.afterClosed().subscribe(data=>{

      })
   
  }

  clearTachData(){
    this.tachChoisie.prix_u=null
    this.tachChoisie.unite=null
    this.tachChoisie.designation=null
    this.tachChoisie.id=null
  }
  fillTachData(event,tach){
    if(event){
      this.tachChoisie.prix_u=tach.prix_u
      this.tachChoisie.unite=tach.unite
      this.tachChoisie.designation=tach.designation
      this.tachChoisie.code=tach.code
      this.tachChoisie.id=tach.id
    }
    
  }

  deleteTach(produit:Tach){
    let dialogRef=this.dialog.open(ConfirmDialogComponent)
    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        var idP=this.projet.id_projet
        var idT=produit.id

        this.__associationService.unlink_projet_tach(idP,idT).subscribe(data=>{
          var index=this.mesTach.findIndex(tach=>tach.id===idT);
          
          this.mesTach.splice(index,1);

        })
      }
    })
  }


  //////////////////////////////charge METHOD////////////////////////////////////
  onAddCharge(chargeForm){
    
    if(!chargeForm.valid){
      alert("il faux donne toute les info")
      return
    }
    var isExist=this.mesCharge.some(r => r.designation === chargeForm.value.designation);
    if (isExist){
      alert("produit deja exist")
      return;
    }
    let charge:Produit = new Produit();
    //if it's new produit 
    var obj = {
      designation:chargeForm.value.designation,
      unite:chargeForm.value.unite,
      prix_u:chargeForm.value.prix_u
    }
    
    this.__chargeService.postProduit(obj).subscribe((data)=>{
      var id=data.insertId

      charge.id=id;
      charge.designation=chargeForm.value.designation;
      charge.unite=chargeForm.value.unite
      charge.prix_u=chargeForm.value.prix_u;
      charge.quantite=chargeForm.value.quantite
      
      var link={
        id_projet:this.projet.id_projet,
        id_produit:id,
        qt:chargeForm.value.quantite
      }
       
      this.__associationService.link_projet_produit(link).subscribe(res=>{
          this.mesCharge.push(charge)
       },err=>{alert("error in produit insert code 2")})
    },err=>{alert("error in produit insert")})
    }
  
    deleteCharge(produit){
      let dialogRef=this.dialog.open(ConfirmDialogComponent)
      dialogRef.afterClosed().subscribe(res=>{
      if(res){
        var idP=this.projet.id_projet
        var idT=produit.id
        this.__associationService.unlink_projet_produit(idP,idT).subscribe(data=>{
          var index=this.mesCharge.findIndex(pr=>pr.id===idT);
          this.mesCharge.splice(index,1);

        },err=>{alert("error delete ")})
      }
    })
    }

  //////////////////////////////dotation METHOD////////////////////////////////////
  onAddDotation(doationForm){
    if(!doationForm.valid){
      alert("il faux donne toute les info")
      return
    }
    var isExist=this.mesDotation.some(r => r.designation === doationForm.value.designation);
    
    if (isExist){
      alert("doataion deja exist")
      return;
    }
    var dotation = new Dotation()
    dotation=doationForm.value
    var obj={
      id_projet:this.projet.id_projet,
      unite:doationForm.value.unite,
      designation:doationForm.value.designation,
      qt_initial:doationForm.value.quantite_initial
    }
    this.__dotationService.postDotation(obj).subscribe(data=>{
      dotation.id_dotation=data.insertId
      this.mesDotation.push(dotation)
    })

  }

  deleteDotation(produit){

    let dialogRef=this.dialog.open(ConfirmDialogComponent)
      dialogRef.afterClosed().subscribe(res=>{
      if(res){
        var idT=produit.id_dotation
        this.__dotationService.deleteDotation(idT).subscribe(data=>{
          var index=this.mesDotation.findIndex(dt=>dt.id_dotation===idT);
          this.mesDotation.splice(index,1);
        },err=>{alert("error delete ")})
      }
    })
  }

//-------------reintegration--------------------------
onAddReintegration(reintegrationForm){
if(!reintegrationForm.valid){
      alert("il faux donne toute les info")
      return
    }
    var isExist=this.mesReintegration.some(r => r.designation === reintegrationForm.value.designation);
    
    if (isExist){
      alert("deja exist")
      return;
    }

    var obj={
      id_projet:this.projet.id_projet,
      unite:reintegrationForm.value.unite,
      designation:reintegrationForm.value.designation,
      qt_livre:reintegrationForm.value.qt_livre,
      qt_demende:reintegrationForm.value.qt_demende
    }
    
    var dotation = new Reintegration()

    dotation.qt_demende= obj.qt_demende
    dotation.qt_livre= obj.qt_livre
    dotation.unite= obj.unite
    dotation.designation = obj.designation;
    dotation.id_projet=this.projet.id_projet
    this.__reintegrationService.postReintegration(obj).subscribe(data=>{
      dotation.id_reintegration=data.insertId
      this.mesReintegration.push(dotation)
    })
}

deleteReintegration(produit:Reintegration){
  
  let dialogRef=this.dialog.open(ConfirmDialogComponent)
  dialogRef.afterClosed().subscribe(res=>{
  if(res){
    var idT=produit.id_reintegration
    this.__reintegrationService.deleteReintegration(idT).subscribe(data=>{
      var index=this.mesReintegration.findIndex(dt=>dt.id_reintegration===idT);
      this.mesReintegration.splice(index,1);
    },err=>{alert("error delete ")})
  }
})
}
//------------------------Method des facture -------------------------------------

}


function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}