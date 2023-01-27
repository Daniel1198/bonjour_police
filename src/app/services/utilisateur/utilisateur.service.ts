import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  urlG: string;
  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient
  ) { 
    this.urlG = this.configService.urlg;
  }

  listeUtilisateur(): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/utilisateur/utilisateur_liste.php');
  }

  nouvelUtilisateur(utilisateur: any): Observable<any> {
    return this.httpClient.post<any>(this.urlG + '/utilisateur/ajout.php', utilisateur);
  }

  supprimerUtilisateur(id: number): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/utilisateur/utilisateur_liste.php?id=' + id);
  }

  modifierUtilisateur(utilisateur: any): Observable<any> {
    return this.httpClient.post<any>(this.urlG + '/utilisateur/modif.php', utilisateur);
  }
}
