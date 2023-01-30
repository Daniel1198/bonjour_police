import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class FichePoliceService {

  urlG: string;

  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient
  ) { 
    this.urlG = this.configService.urlg
  }

  nouvelleFichePolice(fichePolice: any): Observable<any> {
    return this.httpClient.post<any>(this.urlG + '/fiche_police/ajout.php', fichePolice);
  }

  fichePoliceRecherche(search: string): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/fiche_police/fiche_police_recherche.php?' + search);
  }

  listeFichePolice(): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/fiche_police/liste_fiche_police.php');
  }

  fichePoliceParNationalite(hebId: number): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/fiche_police/tb_heb_fiche_policeNationnalite.php?ficp_heb_id=' + hebId);
  }

  fichePoliceRecente(hebId: number): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/fiche_police/tb_heb_fiche_police_recherche.php?ficp_heb_id=' + hebId);
  }

  fichePoliceVisite(hebId: number, annee: string): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/fiche_police/tb_heb_fiche_policeVisite.php?ficp_heb_id=' + hebId + '&annee=' + annee);
  }

  comFichePoliceParNationalite(commissariat: string): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/fiche_police/tb_com_fiche_policeNationnalite.php?heb_commissariat=' + commissariat);
  }
}
