import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef, AfterContentInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {  MatTableDataSource } from '@angular/material/table';
import { Projet } from '../projet.model';
import { MatDialog   } from '@angular/material';

import { ProjectService } from 'src/app/shared-services/project.service';
import { DatePipe } from '@angular/common';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-projet-table',
  templateUrl: './projet-table.component.html',
  styleUrls: ['./projet-table.component.css']
})
export class ProjetTableComponent implements   OnInit {
  //personal attribute
  projets:Projet[]=[]
  searchKey:String=""
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  dataSource=null;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Designation', 'date_debut','delais','N_BNC',"Options"];

  constructor(private __prjectService:ProjectService,
    public datepipe: DatePipe,
    private confirmDialog: MatDialog){}


    
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {

   
    this.__prjectService.getAllProject().subscribe(
      (data:Projet[])=>{
        console.log(data)
        this.projets=data

        this.dataSource = new MatTableDataSource(this.projets);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },err=>{
        console.log("error geting projects",err)
      }

    );
   
  }

  refreshTable(){
    
  }
  
  remove(id:number){
   
    let ConfirmDialogRef=this.confirmDialog.open(ConfirmDialogComponent)
    ConfirmDialogRef.afterClosed().subscribe(res=>{
      if (res === true){
        this.__prjectService.deleteProjet(id).subscribe(data=>{
          let index = this.dataSource.data.findIndex(d => d.id_projet === id); //find index in your array
          this.dataSource.data.splice(index, 1);
          this.dataSource.paginator._changePageSize(this.paginator.pageSize);
          console.log("deleted num "+id)
        },err=>{
          alert("error delete")
        })
      }else{
        console.log("cancel procedure")
      }
    })
   
   
  }
  edit(id:number){
    console.log(id)
  }
  

  onSearchClear() {
    this.searchKey = "";
   
  }


}
