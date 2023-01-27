import { Component, OnInit } from '@angular/core';
import { replaceAccent } from 'src/app/services/functions';
import { HebergeurService } from 'src/app/services/hebergeur/hebergeur.service';
import { VilleService } from 'src/app/services/ville/ville.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hebergements',
  templateUrl: './hebergements.component.html',
  styleUrls: ['./hebergements.component.css']
})
export class HebergementsComponent implements OnInit {

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];

  villes: any[] = [];
  hebergeurs: any[] = [];
  data: any[] = [];
  loading: boolean = false;

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  constructor(
    private villeService: VilleService,
    private hebergeurService: HebergeurService
  ) { }

  ngOnInit(): void {
    this.getAllCities();
    this.getAllHotels();
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
      this.hebergeurs = this.data.filter(hebergeur => 
        (replaceAccent(hebergeur.heb_designation).includes(replaceAccent(search)) ||
        replaceAccent(hebergeur.heb_type).includes(replaceAccent(search)) ||
        replaceAccent(hebergeur.heb_commissariat).includes(replaceAccent(search)) ||
        hebergeur.heb_tel.split(' ').join('').toLowerCase().includes(search.toLocaleLowerCase())) &&
        hebergeur.heb_ville.toLowerCase() == city.toLocaleLowerCase()
      );
    }
    else if(search && !city) {
      this.hebergeurs = this.data.filter(hebergeur => 
        replaceAccent(hebergeur.heb_designation).includes(replaceAccent(search)) ||
        replaceAccent(hebergeur.heb_type).includes(replaceAccent(search)) ||
        replaceAccent(hebergeur.heb_commissariat).includes(replaceAccent(search)) ||
        hebergeur.heb_tel.split(' ').join('').toLowerCase().includes(search.toLocaleLowerCase())
      );
    }
    else if(!search && city) {
      this.loading = true;
      this.hebergeurService.hebergeurParVille(city).subscribe(
        response => {
          this.loading = false
          this.hebergeurs = response.results;
        }
      );
    }
    else {
      this.getAllHotels();
    }
    this.page = 1;
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer cet hébergeur ?',
      showDenyButton: true,
      confirmButtonText: 'Oui',
      denyButtonText: `Non`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.loading = true;
        this.hebergeurService.supprimerHebergeur(id).subscribe(
          response => {
            this.loading = false;
            if (response.success) {
              this.Toast.fire({
                icon: 'success',
                title: response.message
              })
            }
            this.getAllCities();
          }
        );
      }
    })
  }

  getAllHotels() {
    this.loading = true;
    this.hebergeurService.listeHebergeur().subscribe(
      response => {
        this.loading = false;
        this.data = response.results;
        this.hebergeurs = response.results;
      }
    );
  }

  changeSize(value: string) {
    this.tableSize = +value;
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.data;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.data;
  }

}
