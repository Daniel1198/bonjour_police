import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  formGroup!: FormGroup;
  loading: boolean = false;

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
    private profilRechercheService: ProfilRechercheService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getAllProfile();
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      id: [''],
      nomPrenom: ['', Validators.required],
      genre: ['', Validators.required],
      nationalite: ['', Validators.required],
      ageMin: ['', Validators.required, Validators.max(100), Validators.min(0)],
      ageMax: ['', [Validators.required, Validators.max(100), Validators.min(0)]],
    });
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
    this.profilsRecherches;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.profilsRecherches;
  }

  changeScreen() {
    this.showAddProfileScreen = !this.showAddProfileScreen;
  }
}
