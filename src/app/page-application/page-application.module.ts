import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import { FormsModule } from '@angular/forms';
import { ProfilRechercheComponent } from './commissariat/profil-recherche/profil-recherche.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { DashboardCommissariatComponent } from './dashboard-commissariat/dashboard-commissariat.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


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
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    PageApplicationRoutingModule,
    NgxPaginationModule,
    NgSelectModule,
    FormsModule,
    HighchartsChartModule
  ]
})
export class PageApplicationModule { }
