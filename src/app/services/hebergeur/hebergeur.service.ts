import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class HebergeurService {

  urlG: string;
  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient
  ) { 
    this.urlG = this.configService.urlg;
  }

  nouvelHebergeur(hebergeur: any): Observable<any> {
    return this.httpClient.post<any>(this.urlG + '/hebergeur/ajout.php', hebergeur);
  }

  modifierHebergeur(hebergeur: any): Observable<any> {
    return this.httpClient.post<any>(this.urlG + '/hebergeur/ajout.php', hebergeur);
  }

  hebergeurParVille(ville: string): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/hebergeur/liste_par_ville.php?heb_ville=' + ville);
  }

  hebergeurParCommissariat(commissariat: string): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/commissariat/liste_heb_par_com.php?heb_commissariat=' + commissariat);
  }

  listeHebergeur(): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/hebergeur/liste.php');
  }

  supprimerHebergeur(id: number): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/hebergeur/liste.php?id=' + id);
  }

}
