import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCommissariatComponent } from './administration/add-commissariat/add-commissariat.component';
import { AddHebergeurComponent } from './administration/add-hebergeur/add-hebergeur.component';
import { CommissariatComponent } from './administration/commissariat/commissariat.component';
import { HebergementsComponent } from './administration/hebergements/hebergements.component';
import { UtilisateursComponent } from './administration/utilisateurs/utilisateurs.component';
import { VillesComponent } from './administration/villes/villes.component';
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
  { path: 'hebergement/add-fiche-police/:id', component: AddFichePoliceComponent },

  { path: 'commissariat/fiche-hebergement', component: FicheHebergementComponent },
  { path: 'commissariat/profil-recherche', component: ProfilRechercheComponent },
  { path: 'commissariat/dashboard', component: DashboardCommissariatComponent },

  { path: 'administration/commissariats', component: CommissariatComponent },
  { path: 'administration/add-commissariat/:id', component: AddCommissariatComponent },
  { path: 'administration/villes', component: VillesComponent },
  { path: 'administration/hebergements', component: HebergementsComponent },
  { path: 'administration/add-hebergeur/:id', component: AddHebergeurComponent },
  { path: 'administration/utilisateurs', component: UtilisateursComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageApplicationRoutingModule { }
