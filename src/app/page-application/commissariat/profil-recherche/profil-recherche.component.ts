import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FichePoliceService } from 'src/app/services/fiche-police/fiche-police.service';
import { NationaliteService } from 'src/app/services/nationalite.service';
import { ProfilRechercheService } from 'src/app/services/profil-recherche/profil-recherche.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profil-recherche',
  templateUrl: './profil-recherche.component.html',
  styleUrls: ['./profil-recherche.component.css']
})
export class ProfilRechercheComponent implements OnInit {

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];

  profilsRecherches: any[] = [];
  fichesPolice: any[] = [];
  data: any[] = [];
  nationalites: any[] = [];
  formGroup!: FormGroup;
  loading: boolean = false;
  nowDate: Date = new Date();

  showAddProfileScreen: boolean = false;

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
    private formBuilder: FormBuilder,
    private nationaliteService: NationaliteService,
    private profilRechercheService: ProfilRechercheService,
    private fichePoliceService: FichePoliceService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.nationalites = this.nationaliteService.nationalites;
    this.getAllProfile();
    this.getAllFiche();
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      id: [''],
      nomPrenom: ['', Validators.required],
      genre: ['', Validators.required],
      nationalite: ['', Validators.required],
      ageMin: ['', [Validators.required, Validators.max(100), Validators.min(0)]],
      ageMax: ['', [Validators.required, Validators.max(100), Validators.min(0)]],
    });
  }

  getAllFiche() {
    this.loading = true;
    this.fichePoliceService.listeFichePolice().subscribe(
      response => {
        this.loading = false;
        this.data = response.results;
        this.fichesPolice = response.results;
      }
    )
  }

  onSubmit() {
    if (this.formGroup.get('ageMin')?.value > this.formGroup.get('ageMax')?.value) {
      this.Toast.fire({
        icon: 'error',
        title: 'L\'âge minimal ne doit pas être supérieur à l\'âge maximal'
      })
    }
    else {
      this.loading = true;
      const formprofilsRecherches = new FormData();

      formprofilsRecherches.append('prf_id', this.formGroup.get('id')?.value);
      formprofilsRecherches.append('prf_nomprenoms', this.formGroup.get('nomPrenom')?.value);
      formprofilsRecherches.append('prf_genre', this.formGroup.get('genre')?.value);
      formprofilsRecherches.append('prf_nationnalite', this.formGroup.get('nationalite')?.value);
      formprofilsRecherches.append('prf_agedeb', this.formGroup.get('ageMin')?.value);
      formprofilsRecherches.append('prf_agefin', this.formGroup.get('ageMax')?.value);

      this.profilRechercheService.nouveauProfilRecherche(formprofilsRecherches).subscribe(
        response => {
          this.loading = false;
          if (response.statut) {
            this.Toast.fire({
              icon: 'success',
              title: response.message
            })
            this.formGroup.reset();
            this.getAllProfile();
          }
          else {
            this.Toast.fire({
              icon: 'error',
              title: response.message
            })
          }
        }
      );
    }
  }

  getAllProfile() {
    this.loading = true;
    this.profilRechercheService.listeProfilRecherche().subscribe(
      response => {
        this.loading = false;
        this.profilsRecherches = response.results
      }
    );
  }

  changeSize(value: string) {
    this.tableSize = +value;
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.showAddProfileScreen ? this.profilsRecherches : this.fichesPolice;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.showAddProfileScreen ? this.profilsRecherches : this.fichesPolice;
  }

  changeScreen() {
    this.showAddProfileScreen = !this.showAddProfileScreen;
    this.page = 1;
  }

  getTime(date: Date): number {
    const d = new Date(date);
    return d.getTime();
  }

  onSearch(name: string, nationalite: string) {
    if (name.trim() && !nationalite) {
      this.fichesPolice = this.data.filter(fp => {
        let nomPrenom = fp.ficp_nom + ' ' + fp.ficp_prenoms;
        return nomPrenom.toLowerCase().includes(name.toLowerCase())
      })
    }
    else if (name.trim() && nationalite) {
      this.fichesPolice = this.data.filter(fp => {
        let nomPrenom = fp.ficp_nom + ' ' + fp.ficp_prenoms;
        return nomPrenom.toLowerCase().includes(name.toLowerCase()) && 
          fp.ficp_nationnalite.toLowerCase().trim() == nationalite.toLowerCase().trim()
      })
    }
    else if (!name.trim() && nationalite) {
      this.fichesPolice = this.data.filter(fp => {
        return fp.ficp_nationnalite.toLowerCase().trim() == nationalite.toLowerCase().trim()
      })
    }
    else {
      this.getAllFiche();
    }
    this.page = 1;
  }
}
