import { Component, OnInit } from '@angular/core';
import { CommissariatService } from 'src/app/services/commissariat/commissariat.service';
import { VilleService } from 'src/app/services/ville/ville.service';

@Component({
  selector: 'app-commissariat',
  templateUrl: './commissariat.component.html',
  styleUrls: ['./commissariat.component.css']
})
export class CommissariatComponent implements OnInit {

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];

  commissariats: any[] = [];
  data: any[] = [];
  villes: any[] = [];
  loading: boolean = false;

  constructor(
    private villeService: VilleService,
    private commissariatService: CommissariatService
  ) { }

  ngOnInit(): void {
    this.getAllCities();
    this.getAllPolices();
  }

  getAllPolices() {
    this.loading = true;
    this.commissariatService.listeCommissariat().subscribe(
      response => {
        this.loading = false;
        this.commissariats = response.results;
        this.data = response.results;
      }
    );
  }

  getAllCities() {
    this.villeService.listeVille().subscribe(
      response => {
        this.villes = response.results;
      }
    );
  }

  onSearch(search: string, city: string) {
    if (city && search) {
      this.commissariats = this.data.filter(commissariat => 
        (commissariat.com_commissariat.toLowerCase().includes(search.toLocaleLowerCase()) ||
        commissariat.com_quartier.toLowerCase().includes(search.toLocaleLowerCase()) ||
        commissariat.com_tel.toLowerCase().includes(search.toLocaleLowerCase()) ||
        commissariat.com_cel.toLowerCase().includes(search.toLocaleLowerCase()) ||
        commissariat.com_commissaire.toLowerCase().includes(search.toLocaleLowerCase())) &&
        commissariat.com_ville.toLowerCase() == city.toLocaleLowerCase()
      );
    }
    else if(search && !city) {
      this.commissariats = this.data.filter(commissariat => 
        commissariat.com_commissariat.toLowerCase().includes(search.toLocaleLowerCase()) ||
        commissariat.com_quartier.toLowerCase().includes(search.toLocaleLowerCase()) ||
        commissariat.com_tel.toLowerCase().includes(search.toLocaleLowerCase()) ||
        commissariat.com_cel.toLowerCase().includes(search.toLocaleLowerCase()) ||
        commissariat.com_commissaire.toLowerCase().includes(search.toLocaleLowerCase())
      );
    }
    else if(!search && city) {
      this.loading = true;
      this.commissariatService.commissariatParVille(city).subscribe(
        response => {
          this.loading = false
          this.commissariats = response.results;
        }
      );
    }
    else {
      this.getAllPolices();
    }
    this.page = 1;
  }

  changeSize(value: string) {
    this.tableSize = +value;
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.commissariats;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.commissariats;
  }

}
