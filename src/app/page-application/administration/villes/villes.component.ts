import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { replaceAccent } from 'src/app/services/functions';
import { VilleService } from 'src/app/services/ville/ville.service';
import Swal from 'sweetalert2';

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
  data: any[] = [];

  showAddCity: boolean = false;
  loading: boolean = false;
  formGroup!: FormGroup;
  update: boolean = false;

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
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getAllCities();
    this.initForm();
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      id: [''],
      libelle: ['', Validators.required],
    });
  }

  getAllCities() {
    this.loading = true;
    this.villeService.listeVille().subscribe(
      response => {
        this.loading = false;
        this.villes = response.results;
        this.data = response.results;
      }
    );
  }

  onSubmit() {
  
    const formData = new FormData();
    formData.append('vil_id', this.formGroup.get('id')?.value);
    formData.append('vil_ville', this.formGroup.get('libelle')?.value);

    if (!this.update) {
      this.villeService.nouvelleVille(formData).subscribe(
        response => {
          this.loading = true;
          if (response.statut) {
            this.Toast.fire({
              icon: 'success',
              title: response.message
            })
            this.formGroup.reset()
            this.getAllCities()
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
          this.villeService.modifierVille(formData).subscribe(
            response => {
              this.loading = false;
              if (response.statut) {
                this.Toast.fire({
                  icon: 'success',
                  title: response.message
                })
                this.formGroup.reset();
                this.getAllCities();
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

  onUpdate(ville: any) {
    this.showAddCity = true;
    this.update = true;
    this.formGroup.patchValue({
      id: ville.vil_id,
      libelle: ville.vil_ville
    })
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer cette ville ?',
      showDenyButton: true,
      confirmButtonText: 'Oui',
      denyButtonText: `Non`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.loading = true;
        this.villeService.supprimerVille(id).subscribe(
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

  onCancel() {
    if (this.update) {
      this.update = false;
      this.formGroup.reset();
    }
  }

  onSearch(search: string) {
    if (search) {
      this.villes = this.data.filter(ville => 
        replaceAccent(ville.vil_ville).includes(replaceAccent(search))
      );
    }
    else {
      this.getAllCities();
    }
    this.page = 1;
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
    this.getAllCities();
    this.showAddCity = !this.showAddCity;
    if (this.update) {
      this.update = false;
      this.formGroup.reset();
    }
  }
}
