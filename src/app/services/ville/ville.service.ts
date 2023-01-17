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
    this.urlG = configService.urlg;
  }

  listeVille(): Observable<any> {
    return this.httpClient.get<any>(this.urlG + '/ville/ville_liste.php');
  }
}
