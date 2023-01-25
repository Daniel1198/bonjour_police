import { Component, OnInit } from '@angular/core';
import { FichePoliceService } from 'src/app/services/fiche-police/fiche-police.service';
import { HebergeurService } from 'src/app/services/hebergeur/hebergeur.service';

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
  hebergeurs: any[] = [];
  loading: boolean = false;

  idHotel!: string;
  profile!: string;
  villeheb: any;
  hebergeur2!: number;

  constructor(
    private fichePoliceService: FichePoliceService,
    private hebergeurService: HebergeurService
  ) { }

  ngOnInit(): void {
    this.idHotel = localStorage.getItem('user_heb_id')!;
    this.profile = localStorage.getItem('prof_id')!;
    this.villeheb = localStorage.getItem('user_heb_ville')!;
    const day = this.nowDate.getDate() < 10 ? '0' + this.nowDate.getDate() : this.nowDate.getDate();
    const month = this.nowDate.getMonth() < 10 ? '0' + this.nowDate.getMonth() + 1 : this.nowDate.getMonth() + 1;
    const date = this.nowDate.getFullYear() + '-' + month + '-' + day;
    this.getHotelsByCity();
    this.onSearch(date, date, +this.idHotel);
  }

  getHotelsByCity() {
    if (+this.profile == 1) {
      this.hebergeurService.listeHebergeur().subscribe(
        response => {
          this.hebergeurs = response.results;
        }
      );
    }
    else {
      this.hebergeurService.hebergeurParVille(this.villeheb).subscribe(
        response => {
          this.hebergeurs = response.results;
        }
      );
    }
  }

  getTime(date: Date): number {
    const d = new Date(date);
    return d.getTime();
  }

  onSearch(dateDeb: string, dateFin: string, hebergeur: number) {
    this.loading = true;
    const search = 'ficp_datedeb='+dateDeb+'&ficp_datefin='+dateFin+'&ficp_heb_id='+hebergeur;
    this.fichePoliceService.fichePoliceRecherche(search).subscribe(
      response => {
        this.loading = false;
        this.fichesPolice = response.results;
        this.page = 1;
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
