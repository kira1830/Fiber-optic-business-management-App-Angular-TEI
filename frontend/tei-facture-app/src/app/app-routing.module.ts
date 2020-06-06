import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MesProjetComponent } from './mes-projet/mes-projet.component';
import { MesClientComponent } from './mes-client/mes-client.component';
import { MesProduitComponent } from './mes-produit/mes-produit.component';
import { ComptabiliteComponent } from './comptabilite/comptabilite.component';
import { ProjetFormComponent } from './mes-projet/projet-form/projet-form.component';
import { ProjetEnvComponent } from './mes-projet/projet-env/projet-env.component';
import { FactureComponent } from './report/facture/facture.component';
import { ClientEnvComponent } from './mes-client/client-env/client-env.component';
import { DotationComponent } from './report/dotation/dotation.component';
import { ConstatationComponent } from './report/constatation/constatation.component';
import { ReversementComponent } from './report/reversement/reversement.component';
import { ProformaComponent } from './report/proforma/proforma.component';
import { SettingComponent } from './setting/setting.component';
import { ReintegrationComponent } from './report/reintegration/reintegration.component';


const routes: Routes = [
  { path :'',component:HomeComponent},
  { path :'home',component:HomeComponent},
  { path :'MesProjet',component:MesProjetComponent},
  { path :'MesClient',component:MesClientComponent},
  { path :'MesProduit',component:MesProduitComponent},
  { path :'Comptabilite',component:ComptabiliteComponent},
  { path :'MesProjet/create',component:ProjetFormComponent},
  { path :'MesProjet/projet/:id',component:ProjetEnvComponent},
  { path :'MesProjet/projet/facture/:id',component:FactureComponent},
  { path :'MesProjet/projet/dotation/:id',component:DotationComponent},
  { path :'MesProjet/projet/reintegration/:id',component:ReintegrationComponent},
  { path :'MesProjet/projet/constatation/:id',component:ConstatationComponent},
  { path :'MesProjet/projet/reversement/:id',component:ReversementComponent},
  { path :'MesProjet/projet/proforma/:id',component:ProformaComponent},
  { path :'setting',component:SettingComponent},
  { path :'MesProjet/client/:id',component:ClientEnvComponent},
  { path :'facture',component:FactureComponent,outlet:"reports"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
