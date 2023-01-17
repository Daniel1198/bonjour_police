import { Component, OnInit } from '@angular/core';
import { VilleService } from 'src/app/services/ville/ville.service';

@Component({
  selector: 'app-villes',
  templateUrl: './villes.component.html',
  styleUrls: ['./villes.component.css']
})
export class VillesComponent implements OnInit {

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];

  villes: any[] = [];

  showAddCity: boolean = false;

  constructor(
    private villeService: VilleService
  ) { }

  ngOnInit(): void {
    this.getAllCities();
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
    this.villes;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.villes;
  }

  changeScreen() {
    this.showAddCity = !this.showAddCity;
  }
}
