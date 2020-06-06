import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { ClientService } from 'src/app/shared-services/client.service';
import { Client } from '../client.model';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-tabel-client',
  templateUrl: './tabel-client.component.html',
  styleUrls: ['./tabel-client.component.css']
})
export class TabelClientComponent implements OnInit {
  listClient:Client[]=[];
  dataSource = null;
  constructor(private __clientService:ClientService,
    private dialog: MatDialog ) { }
  
  @ViewChild(MatSort, {static: true}) sort: MatSort; 
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  ngOnInit() {
    this.__clientService.getAllClient().subscribe(data=>{
      this.listClient = data
      
      this.dataSource = new MatTableDataSource(this.listClient);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator=this.paginator
    })
  
  }


  displayedColumns: string[] = ['Nom_societe', 'N_RC', 'adress','tel','fax','option'];
  
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteClient(id_societe){

    console.log("id:" + id_societe)
    
    let ref = this.dialog.open(ConfirmDialogComponent);
    ref.afterClosed().subscribe(res=>{
      if(res){
        this.__clientService.deleteClient(id_societe).subscribe(ress=>{
          alert("delete successfuly")
          let index = this.listClient.findIndex(d => d.id_societe === id_societe); //find index in your array
          this.listClient.splice(index,1)
          this.dataSource = new MatTableDataSource( this.listClient)
          
          this.dataSource.sort = this.sort;
          this.dataSource.paginator=this.paginator

          this.dataSource.paginator._changePageSize(this.paginator.pageSize);
        },err=>{alert("error while deleting client")})
      }
    })
  }
}
