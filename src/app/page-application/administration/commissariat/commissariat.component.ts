import { Component, OnInit } from '@angular/core';
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
  villes: any[] = [];
  loading: boolean = false;

  constructor(
    private villeService: VilleService
  ) { }

  ngOnInit(): void {
    this.getAllCities();
    this.getAllPolices();
  }

  getAllPolices() {
    this.loading = true;
  }

  getAllCities() {
    this.villeService.listeVille().subscribe(
      response => {
        this.villes = response.results;
      }
    );
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
