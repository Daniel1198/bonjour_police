import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  urlG: string;
   constructor(
     private configService: ConfigService,
     private httpClient: HttpClient) {
     this.urlG = this.configService.urlg;
   }
 
  chargeUnAgent(id: any): Observable<any> {
     return this.httpClient.get<any>(this.urlG + '/agent/agentparid.php?agents_id='+id);
  }
   
   listeAgents(): Observable<any> {
     return this.httpClient.get<any>(this.urlG + '/agent/listeagents.php');
   }
 
   listeDepartements(): Observable<any> {
     return this.httpClient.get<any>(this.urlG + '/agent/listedepartements.php');
   }
 
    creationAgent(data: any): Observable<any> {
     return this.httpClient.post(this.urlG + '/agent/ajoutagent.php', data);
    }
   
     modifierAgent(data: any): Observable<any> {
     return this.httpClient.post(this.urlG + '/agent/modifiagent.php', data);
    }
   
     supprimerUnAgent(id: any): Observable<any> {
     return this.httpClient.get<any>(this.urlG + '/agent/supagentparidauto.php?id_auto='+id);
   }
   
 }