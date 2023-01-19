import { Component, OnInit } from '@angular/core';
import { FichePoliceService } from 'src/app/services/fiche-police/fiche-police.service';
import { HebergeurService } from 'src/app/services/hebergeur/hebergeur.service';

@Component({
  selector: 'app-fiche-hebergement',
  templateUrl: './fiche-hebergement.component.html',
  styleUrls: ['./fiche-hebergement.component.css']
})
export class FicheHebergementComponent implements OnInit {

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  nowDate: Date = new Date();
  loading: boolean = false;

  fichesPolice: any[] = [];
  hebergeurs: any[] = [];
  
  constructor(
    private fichePoliceService: FichePoliceService,
    private hebergeurService: HebergeurService
  ) {}

  ngOnInit(): void {
    const day = this.nowDate.getDate() < 10 ? '0' + this.nowDate.getDate() : this.nowDate.getDate();
    const month = this.nowDate.getMonth() < 10 ? '0' + this.nowDate.getMonth() + 1 : this.nowDate.getMonth() + 1;
    const date = this.nowDate.getFullYear() + '-' + month + '-' + day;
    this.getHotelsByCity();
    this.onSearch(date, date, 24);
  }

  onSearch(dateDeb: string, dateFin: string, hebergeur: number) {
    this.loading = true;
    const search = 'ficp_datedeb='+dateDeb+'&ficp_datefin='+dateFin+'&ficp_heb_id='+hebergeur;
    this.fichePoliceService.fichePoliceRecherche(search).subscribe(
      response => {
        this.loading = false;
        this.fichesPolice = response.results;
      }
    )
  }

  getTime(date: Date): number {
    const d = new Date(date);
    return d.getTime();
  }

  getHotelsByCity() {
    this.hebergeurService.hebergeurParVille('ABIDJAN-YOPOUGON').subscribe(
      response => {
        this.hebergeurs = response.results;
      }
    );
  }

  changeSize(value: string) {
    this.tableSize = +value;
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.fichesPolice;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fichesPolice;
  }

}
