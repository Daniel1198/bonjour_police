import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommissariatService } from 'src/app/services/commissariat/commissariat.service';
import { VilleService } from 'src/app/services/ville/ville.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-commissariat',
  templateUrl: './add-commissariat.component.html',
  styleUrls: ['./add-commissariat.component.css']
})
export class AddCommissariatComponent implements OnInit {

  formGroup!: FormGroup;
  loading: boolean = false;
  villes: any[] = [];

  id!: number;

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
    private commissariatService: CommissariatService,
    private villeService: VilleService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.getAllCity();
    this.initForm();
    this.getOnePolice();
  }

  getOnePolice() {
    if (this.id > 0) {
      this.commissariatService.listeCommissariat().subscribe(
        response => {
          const police = response.results.find((police: any) => police.com_id == this.id);
          this.formGroup.patchValue({
            id: police.com_id,
            designation: police.com_commissariat,
            ville: police.com_ville,
            quartier: police.com_quartier,
            tel: police.com_tel,
            cel: police.com_cel,
            commissaire: police.com_commissaire,
          });
        }
      )
    }
  }

  getAllCity() {
    this.loading = true;
    this.villeService.listeVille().subscribe(
      response => {
        this.loading = false;
        this.villes = response.results;
      }
    );
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      id: [''],
      designation: ['', Validators.required],
      ville: ['', Validators.required],
      quartier: ['', Validators.required],
      tel: ['', Validators.required],
      cel: [''],
      commissaire: ['', Validators.required],
    });
  }

  onSubmit() {
    const formData = new FormData();

    formData.append('id', this.formGroup.get('id')?.value);
    formData.append('com_commissariat', this.formGroup.get('designation')?.value);
    formData.append('com_ville', this.formGroup.get('ville')?.value);
    formData.append('com_quartier', this.formGroup.get('quartier')?.value);
    formData.append('com_tel', this.formGroup.get('tel')?.value);
    formData.append('com_cel', this.formGroup.get('cel')?.value);
    formData.append('com_commissaire', this.formGroup.get('commissaire')?.value);

    if (this.id == 0) {
      this.loading = true;
      this.commissariatService.nouveauCommissariat(formData).subscribe(
        response => {
          this.loading = false;
          if (response.statut) {
            this.Toast.fire({
              icon: 'success',
              title: 'Commissariat ajouté avec succès'
            })
            this.formGroup.reset();
          }
          else {
            this.Toast.fire({
              icon: 'error',
              title: 'Echec de l\'ajout. Veuillez vérifiez que vous accédez bien à internet.'
            });
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
          this.commissariatService.modifierCommissariat(formData).subscribe(
            response => {
              this.loading = false;
              if (response.statut) {
                this.Toast.fire({
                  icon: 'success',
                  title: response.message
                })
                this.router.navigate(['/admin/administration/commissariats']);
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
