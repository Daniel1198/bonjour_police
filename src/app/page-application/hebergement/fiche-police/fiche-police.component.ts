import { Component, OnInit } from '@angular/core';
import { FichePoliceService } from 'src/app/services/fiche-police/fiche-police.service';

@Component({
  selector: 'app-fiche-police',
  templateUrl: './fiche-police.component.html',
  styleUrls: ['./fiche-police.component.css']
})
export class FichePoliceComponent implements OnInit {

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];

  nowDate: Date = new Date();
  fichesPolice: any[] = [];

  constructor(
    private fichePoliceService: FichePoliceService
  ) { }

  ngOnInit(): void {
    
  }

  onSearch(dateDeb: string, dateFin: string, hebergeur: string) {
    const search = 'ficp_datedeb='+dateDeb+'&ficp_datefin='+dateFin+'&ficp_heb_id=24';
    this.fichePoliceService.fichePoliceRecherche(search).subscribe(
      response => {
        this.fichesPolice = response.results;
      }
    )
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
