import * as $ from 'jquery';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';

import { MesProjetComponent } from './mes-projet/mes-projet.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './home/home.component';
import { MesProduitComponent } from './mes-produit/mes-produit.component';
import { MesClientComponent } from './mes-client/mes-client.component';
import { ComptabiliteComponent } from './comptabilite/comptabilite.component';
import { ProjetTableComponent } from './mes-projet/projet-table/projet-table.component';

import { RouterModule } from '@angular/router';

import { MatInputModule, MatNativeDateModule, MatSnackBar, MatButtonToggleModule, MatDividerModule, MatSelectModule } from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import { ProjetFormComponent } from './mes-projet/projet-form/projet-form.component';
import { ClientFormComponent } from './mes-client/client-form/client-form.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ProjetEnvComponent } from './mes-projet/projet-env/projet-env.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import { TachFormDComponent } from './mes-produit/tach-table/tach-form-d/tach-form-d.component';
import { ProjectService } from './shared-services/project.service';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatRadioModule} from '@angular/material/radio';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { UniteFormComponent } from './unite-form/unite-form.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FactureComponent } from './report/facture/facture.component';
import { TabelClientComponent } from './mes-client/tabel-client/tabel-client.component';
import { ClientEnvComponent } from './mes-client/client-env/client-env.component';
import { ProduitTablesComponent } from './mes-produit/produit-tables/produit-tables.component';
import { TachTableComponent } from './mes-produit/tach-table/tach-table.component';
import { ChargeTableComponent } from './mes-produit/charge-table/charge-table.component';
import { SettingComponent } from './setting/setting.component';
import { ConstatationComponent } from './report/constatation/constatation.component';
import { DotationComponent } from './report/dotation/dotation.component';
import { ReversementComponent } from './report/reversement/reversement.component';
import { ProformaTableComponent } from './proforma-table/proforma-table.component';
import { ProformaComponent } from './report/proforma/proforma.component';
import { ChargeFormComponent } from './mes-projet/element-forms/charge-form/charge-form.component';
import { ReintegrationComponent } from './report/reintegration/reintegration.component';

@NgModule({
  declarations: [
    AppComponent,
    MesProjetComponent,
    MainNavComponent,
    HomeComponent,
    MesProduitComponent,
    MesClientComponent,
    ComptabiliteComponent,
    ProjetTableComponent,
    ProjetFormComponent,
    ClientFormComponent,
    ProjetEnvComponent,
    TachFormDComponent,
    ConfirmDialogComponent,
    UniteFormComponent,
    FactureComponent,
    TabelClientComponent,
    ClientEnvComponent,
    ProduitTablesComponent,
    TachTableComponent,
    ChargeTableComponent,
    SettingComponent,
    ConstatationComponent,
    DotationComponent,
    ReversementComponent,
    ProformaTableComponent,
    ProformaComponent,
    ChargeFormComponent,
    ReintegrationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    LayoutModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatAutocompleteModule,
    ReactiveFormsModule ,
    MatRadioModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatSelectModule,
    RouterModule.forRoot([
   
    ]),
  
    MatTableModule,
  
    MatPaginatorModule,
  
    MatSortModule
  ],
  providers: [DatePipe,ProjectService],
  bootstrap: [AppComponent],
  entryComponents:[ClientFormComponent,TachFormDComponent,ConfirmDialogComponent,UniteFormComponent,ChargeFormComponent ]
})
export class AppModule { }
