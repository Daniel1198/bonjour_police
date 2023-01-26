import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class CommissariatService {

  urlG: string;
  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient
  ) { 
    this.urlG = this.configService.urlg;
  }

  commissariatParVille(villeLib: string): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/commissariat/commissariat_par_ville.php?ville='+villeLib);
  }

  nouveauCommissariat(commissariat: any): Observable<any> {
    return this.httpClient.post<any>(this.urlG + '/commissariat/ajout.php', commissariat);
  }

  modifierCommissariat(commissariat: any): Observable<any> {
    return this.httpClient.post<any>(this.urlG + '/commissariat/ajout.php', commissariat);
  }

  listeCommissariat(): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/commissariat/commissariat_liste.php');
  }

  supprimerCommissariat(id: number): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/commissariat/commissariat_liste.php?id=' + id);
  }
}
