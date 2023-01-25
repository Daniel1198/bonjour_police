import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCommissariatComponent } from './administration/add-commissariat/add-commissariat.component';
import { CommissariatComponent } from './administration/commissariat/commissariat.component';
import { HebergementsComponent } from './administration/hebergements/hebergements.component';
import { VillesComponent } from './administration/villes/villes.component';
import { CorrespondanceProfilComponent } from './commissariat/correspondance-profil/correspondance-profil.component';
import { FicheHebergementComponent } from './commissariat/fiche-hebergement/fiche-hebergement.component';
import { ProfilRechercheComponent } from './commissariat/profil-recherche/profil-recherche.component';
import { DashboardCommissariatComponent } from './dashboard-commissariat/dashboard-commissariat.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddFichePoliceComponent } from './hebergement/add-fiche-police/add-fiche-police.component';
import { FichePoliceComponent } from './hebergement/fiche-police/fiche-police.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'reset-password', component: ResetPasswordComponent },

  { path: 'hebergement/fiche-police', component: FichePoliceComponent },
  { path: 'hebergement/add-fiche-police', component: AddFichePoliceComponent },

  { path: 'commissariat/fiche-hebergement', component: FicheHebergementComponent },
  { path: 'commissariat/profil-recherche', component: ProfilRechercheComponent },
  { path: 'commissariat/dashboard', component: DashboardCommissariatComponent },
  { path: 'commissariat/correspondance-profil', component: CorrespondanceProfilComponent },

  { path: 'administration/commissariats', component: CommissariatComponent },
  { path: 'administration/add-commissariat', component: AddCommissariatComponent },
  { path: 'administration/villes', component: VillesComponent },
  { path: 'administration/hebergements', component: HebergementsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageApplicationRoutingModule { }
