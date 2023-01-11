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


@NgModule({
  declarations: [
    DashboardComponent,
    AddFichePoliceComponent,
    FichePoliceComponent,
    FicheHebergementComponent,
    CommissariatComponent,
    VillesComponent,
    HebergementsComponent,
    AddCommissariatComponent
  ],
  imports: [
    CommonModule,
    PageApplicationRoutingModule,
    NgxPaginationModule
  ]
})
export class PageApplicationModule { }
