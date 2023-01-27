import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];

  utilisateurs: any[] = [];
  formGroup!: FormGroup;
  loading: boolean = false;
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
    private formBuilder: FormBuilder,
    private utilisateurService: UtilisateurService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      id: [''],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onCancel() {
    if (this.update) {
      this.update = false;
      this.formGroup.reset()
    }
  }

  onSubmit() {
    if (this.formGroup.get('confirmPassword')?.value != this.formGroup.get('password')?.value) {
      this.Toast.fire({
        icon: 'error',
        title: 'Les mots de passe ne concordent pas.'
      })
    }
    else {
      const formData = new FormData();

      formData.append('prf_id', this.formGroup.get('id')?.value);
      formData.append('prf_nomprenoms', this.formGroup.get('username')?.value);
      formData.append('prf_nomprenoms', this.formGroup.get('password')?.value);

      if (!this.update) {
        this.utilisateurService.nouvelUtilisateur(formData).subscribe(
          response => {
            this.loading = false;
            if (response.statut) {
              this.Toast.fire({
                icon: 'success',
                title: response.message
              })
              this.formGroup.reset();
              this.getAllUser();
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
            this.utilisateurService.modifierUtilisateur(formData).subscribe(
              response => {
                this.loading = false;
                if (response.statut) {
                  this.Toast.fire({
                    icon: 'success',
                    title: response.message
                  })
                  this.formGroup.reset();
                  this.getAllUser();
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

  onUpdate(user: any) {
    this.update = true;
    this.formGroup.patchValue({
      id: user.prf_id,
      username: user.prf_nomprenoms
    })
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer cet utilisateur ?',
      showDenyButton: true,
      confirmButtonText: 'Oui',
      denyButtonText: `Non`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.loading = true;
        this.utilisateurService.supprimerUtilisateur(id).subscribe(
          response => {
            this.loading = false;
            if (response.success) {
              this.Toast.fire({
                icon: 'success',
                title: response.message
              })
            }
            this.getAllUser();
          }
        );
      }
    })
  }

  getAllUser() {
    this.loading = true;
    this.utilisateurService.listeUtilisateur().subscribe(
      response => {
        this.loading = false;
        this.utilisateurs = response.results
      }
    );
  }

  changeSize(value: string) {
    this.tableSize = +value;
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.utilisateurs;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.utilisateurs;
  }

  changeScreen() {
    if (this.update) {
      this.update = false;
      this.formGroup.reset();
    }
    this.page = 1;
  }

}
