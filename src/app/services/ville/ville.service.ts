import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class VilleService {

  urlG: string;
  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient
  ) { 
    this.urlG = this.configService.urlg;
  }

  listeVille(): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/ville/ville_liste.php');
  }

  nouvelleVille(ville: any): Observable<any> {
    return this.httpClient.post<any>(this.urlG + '/ville/ajout.php', ville);
  }

  supprimerVille(id: number): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/ville/ville_liste.php?id=' + id);
  }

  modifierVille(ville: any): Observable<any> {
    return this.httpClient.post<any>(this.urlG + '/ville/ajout.php', ville);
  }
}
