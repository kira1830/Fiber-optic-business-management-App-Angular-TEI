import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { TacheService } from 'src/app/shared-services/tache.service';
import { Tach } from '../produit.model';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { TachFormDComponent } from 'src/app/mes-produit/tach-table/tach-form-d/tach-form-d.component';

@Component({
  selector: 'app-tach-table',
  templateUrl: './tach-table.component.html',
  styleUrls: ['./tach-table.component.css']
})
export class TachTableComponent implements OnInit {
  listTach:Tach[]=[]
  dataSource=null;
  showProgress=false;
  totalTach:number;
  pageIndex:number=0;
  pageSize:number=10;
  mode:boolean
  @Input()
  type: number;

  @ViewChild(MatSort, {static: true}) sort: MatSort; 
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private __tachService:TacheService,
    private dialog:MatDialog) { }

    ngOnInit() {
      this.getAllTach(this.type)
    
    
  }

   getAllTach(type){
     this.showProgress = true
    
     if (type == 1){
      this.mode = true;
      this.__tachService.getBorduro().subscribe(data=>{
        this.listTach = data
  
        this.dataSource = new MatTableDataSource(this.listTach);
        this.dataSource.sort = this.sort;
        
        this.dataSource.paginator = this.paginator
        this.showProgress = false
      },err=>{
        alert("error geting borduro");
        this.showProgress=false;
      })
     }else{
      this.mode=false
        this.__tachService.getMesTach().subscribe(data=>{
        this.listTach = data
        this.dataSource = new MatTableDataSource(this.listTach);
        this.dataSource.sort = this.sort;
        
        this.dataSource.paginator = this.paginator
        this.showProgress = false
      },err=>{
        alert("error geting borduro");
        this.showProgress=false;
      })
     }
    
  }

  onDuplicate(produit:Tach){
    
    console.log(produit)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    produit.mode=1
    dialogConfig.data=produit
    let ref = this.dialog.open(TachFormDComponent,dialogConfig
      );
      ref.afterClosed().subscribe(data=>{
        this.getAllTach(1)    
        this.dataSource.paginator._changePageSize(this.paginator.pageSize);
      })

  }
  ///TODO after 
  getServerData(event){
    this.showProgress=true
    if (event == null ){
      var next = 0
    }else {
      var next = this.pageSize+this.pageIndex
    }
    
    
    this.__tachService.getBorduroWithPage(next , next+this.pageSize).subscribe(
      data=>{
        this.listTach = data
        var filtred = this.listTach.filter(tach=>{tach.borduro = 1})
        this.dataSource = new MatTableDataSource(this.listTach);
        this.dataSource.sort = this.sort;
        
        this.dataSource.paginator = this.paginator
        this.showProgress = false
      },err=>{
        alert("error geting borduro");
        this.showProgress=false;
      }
    )

  }
  
 onSelectTach(produit:Tach){
      console.log(produit)
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "50%";
      produit.mode=0
      dialogConfig.data=produit

      let ref = this.dialog.open(TachFormDComponent,dialogConfig
        );
        ref.afterClosed().subscribe(data=>{
          this.dataSource.paginator._changePageSize(this.paginator.pageSize);
        })

  }

  displayedColumns: string[] =['designation', 'prix_u', 'chapitre','type','unite','date-version','option']; 
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteTach(id_tach){

    console.log("id:" + id_tach)
    
    let ref = this.dialog.open(ConfirmDialogComponent);
    ref.afterClosed().subscribe(res=>{
      if(res){
        this.__tachService.deleteTach(id_tach).subscribe(ress=>{
          alert("delete successfuly")
          let index = this.listTach.findIndex(d => d.id === id_tach); //find index in your array
          this.listTach.splice(index,1)
          this.dataSource = new MatTableDataSource( this.listTach)
          
          this.dataSource.sort = this.sort;
          this.dataSource.paginator=this.paginator

          this.dataSource.paginator._changePageSize(this.paginator.pageSize);
        },err=>{alert("error while deleting tach")})
      }
    })
  }

}
