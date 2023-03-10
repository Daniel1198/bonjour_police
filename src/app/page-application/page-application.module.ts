import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { PageApplicationRoutingModule } from './page-application-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddFichePoliceComponent } from './hebergement/add-fiche-police/add-fiche-police.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FicheHebergementComponent } from './commissariat/fiche-hebergement/fiche-hebergement.component';
import { FichePoliceComponent } from './hebergement/fiche-police/fiche-police.component';
import { CommissariatComponent } from './administration/commissariat/commissariat.component';
import { VillesComponent } from './administration/villes/villes.component';
import { HebergementsComponent } from './administration/hebergements/hebergements.component';
import { AddCommissariatComponent } from './administration/add-commissariat/add-commissariat.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfilRechercheComponent } from './commissariat/profil-recherche/profil-recherche.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { DashboardCommissariatComponent } from './dashboard-commissariat/dashboard-commissariat.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LoaderModule } from '../tpl/loader/loader.module';
import { AddHebergeurComponent } from './administration/add-hebergeur/add-hebergeur.component';
import { UtilisateursComponent } from './administration/utilisateurs/utilisateurs.component';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');
@NgModule({
  declarations: [
    DashboardComponent,
    AddFichePoliceComponent,
    FichePoliceComponent,
    FicheHebergementComponent,
    CommissariatComponent,
    VillesComponent,
    HebergementsComponent,
    AddCommissariatComponent,
    ProfilRechercheComponent,
    DashboardCommissariatComponent,
    ResetPasswordComponent,
    AddHebergeurComponent,
    UtilisateursComponent
  ],
  imports: [
    CommonModule,
    PageApplicationRoutingModule,
    NgxPaginationModule,
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule,
    HighchartsChartModule,
    SweetAlert2Module,
    LoaderModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'fr' }]
})
export class PageApplicationModule { }
