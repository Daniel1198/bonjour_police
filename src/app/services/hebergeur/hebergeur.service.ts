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
}
