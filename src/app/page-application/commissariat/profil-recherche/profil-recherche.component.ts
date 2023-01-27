import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FichePoliceService } from 'src/app/services/fiche-police/fiche-police.service';
import { replaceAccent } from 'src/app/services/functions';
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
  update: boolean = false;

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

  onCancel() {
    if (this.update) {
      this.update = false;
      this.formGroup.reset()
    }
  }

  onSubmit() {
    if (this.formGroup.get('ageMin')?.value > this.formGroup.get('ageMax')?.value) {
      this.Toast.fire({
        icon: 'error',
        title: 'L\'âge minimal ne doit pas être supérieur à l\'âge maximal'
      })
    }
    else {
      const formprofilsRecherches = new FormData();

      formprofilsRecherches.append('prf_id', this.formGroup.get('id')?.value);
      formprofilsRecherches.append('prf_nomprenoms', this.formGroup.get('nomPrenom')?.value);
      formprofilsRecherches.append('prf_genre', this.formGroup.get('genre')?.value);
      formprofilsRecherches.append('prf_nationnalite', this.formGroup.get('nationalite')?.value);
      formprofilsRecherches.append('prf_agedeb', this.formGroup.get('ageMin')?.value);
      formprofilsRecherches.append('prf_agefin', this.formGroup.get('ageMax')?.value);

      if (!this.update) {
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
      else {
        Swal.fire({
          title: 'Confirmez-vous les modifications apportées ?',
          showDenyButton: true,
          confirmButtonText: 'Oui',
          denyButtonText: `Non`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.loading = true;
            this.profilRechercheService.modifierProfilRecherche(formprofilsRecherches).subscribe(
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
        })
      }
    }
  }

  onUpdate(profil: any) {
    this.update = true;
    this.formGroup.patchValue({
      id: profil.prf_id,
      nomPrenom: profil.prf_nomprenoms,
      genre: profil.prf_genre,
      nationalite: profil.prf_nationnalite,
      ageMin: profil.prf_agedeb,
      ageMax: profil.prf_agefin,
    })
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer ce profil ?',
      showDenyButton: true,
      confirmButtonText: 'Oui',
      denyButtonText: `Non`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.loading = true;
        this.profilRechercheService.supprimerProfilRecherche(id).subscribe(
          response => {
            this.loading = false;
            if (response.success) {
              this.Toast.fire({
                icon: 'success',
                title: response.message
              })
            }
            this.getAllProfile();
          }
        );
      }
    })
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
    if (this.update) {
      this.update = false;
      this.formGroup.reset();
    }
    this.showAddProfileScreen = !this.showAddProfileScreen;
    this.page = 1;
  }

  getTime(date: Date): number {
    const d = new Date(date);
    return d.getTime();
  }

  onSearch(search: string, nationalite: string) {
    if (search.trim() && !nationalite) {
      this.fichesPolice = this.data.filter(fp => {
        let nomPrenom = fp.ficp_nom + ' ' + fp.ficp_prenoms;
        return replaceAccent(nomPrenom).includes(replaceAccent(search)) ||
               fp.ficp_tel.split(' ').join('').includes(search) ||
               replaceAccent(fp.heb_designation).includes(replaceAccent(search)) ||
               replaceAccent(fp.heb_ville).includes(replaceAccent(search)) ||
               replaceAccent(fp.heb_commissariat).includes(replaceAccent(search))
      })
    }
    else if (search.trim() && nationalite) {
      this.fichesPolice = this.data.filter(fp => {
        let nomPrenom = fp.ficp_nom + ' ' + fp.ficp_prenoms;
        return replaceAccent(nomPrenom).includes(replaceAccent(search)) && 
               fp.ficp_nationnalite.toLowerCase().trim() == nationalite.toLowerCase().trim() ||
               fp.ficp_tel.split(' ').join('').includes(search) ||
               replaceAccent(fp.heb_designation).includes(replaceAccent(search)) ||
               replaceAccent(fp.heb_ville).includes(replaceAccent(search)) ||
               replaceAccent(fp.heb_commissariat).includes(replaceAccent(search))
      })
    }
    else if (!search.trim() && nationalite) {
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
