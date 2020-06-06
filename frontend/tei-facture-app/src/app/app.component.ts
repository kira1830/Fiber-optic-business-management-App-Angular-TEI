import { Component, OnInit  } from '@angular/core';
import { Router, RouterEvent, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GESTIONAIRE DE FACTURE';
  showSpiner=true;
  report=false;

  constructor(private router:Router){
    this.router.events.subscribe((routerEvent:RouterEvent)=>{
      if(routerEvent instanceof NavigationStart){
        this.showSpiner = true;
      }
      if(routerEvent instanceof NavigationEnd){
        this.showSpiner = false
      }
    })
  }
  ngOnInit(){
    
  }

  onActivateReport(){
    console.log("report")
    this.report=true
  }

  onActivateContent(){
    console.log("content")
    this.report=false
  }
}
