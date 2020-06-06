import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared-services/project.service';


@Component({
  selector: 'app-mes-projet',
  templateUrl: './mes-projet.component.html',
  styleUrls: ['./mes-projet.component.css']
})
export class MesProjetComponent implements OnInit {

  constructor(private prjectService:ProjectService) {
    
  }
  
  ngOnInit(): void {
  
  }

 
 
  
}
