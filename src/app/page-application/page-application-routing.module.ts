import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCommissariatComponent } from './administration/add-commissariat/add-commissariat.component';
import { CommissariatComponent } from './administration/commissariat/commissariat.component';
import { HebergementsComponent } from './administration/hebergements/hebergements.component';
import { VillesComponent } from './administration/villes/villes.component';
import { FicheHebergementComponent } from './commissariat/fiche-hebergement/fiche-hebergement.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddFichePoliceComponent } from './hebergement/add-fiche-police/add-fiche-police.component';
import { FichePoliceComponent } from './hebergement/fiche-police/fiche-police.component';

const routes: Routes = [

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },

  { path: 'hebergement/fiche-police', component: FichePoliceComponent },
  { path: 'hebergement/add-fiche-police', component: AddFichePoliceComponent },

  { path: 'commissariat/fiche-hebergement', component: FicheHebergementComponent },

  { path: 'administration/commissariats', component: CommissariatComponent },
  { path: 'administration/add-commissariat', component: AddCommissariatComponent },
  { path: 'administration/villes', component: VillesComponent },
  { path: 'administration/add-ville', component: VillesComponent },
  { path: 'administration/hebergements', component: HebergementsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageApplicationRoutingModule { }
