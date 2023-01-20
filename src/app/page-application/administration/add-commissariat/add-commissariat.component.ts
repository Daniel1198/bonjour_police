import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private villeService: VilleService
  ) { }

  ngOnInit(): void {
    this.getAllCity();
    this.initForm();
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
    this.loading = true;
    const formData = new FormData();

    formData.append('id', this.formGroup.get('id')?.value);
    formData.append('com_commissariat', this.formGroup.get('designation')?.value);
    formData.append('com_ville', this.formGroup.get('ville')?.value);
    formData.append('com_quartier', this.formGroup.get('quartier')?.value);
    formData.append('com_tel', this.formGroup.get('tel')?.value);
    formData.append('com_cel', this.formGroup.get('cel')?.value);
    formData.append('com_commissaire', this.formGroup.get('commissaire')?.value);

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

}
