import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FichePoliceService } from 'src/app/services/fiche-police/fiche-police.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-fiche-police',
  templateUrl: './add-fiche-police.component.html',
  styleUrls: ['./add-fiche-police.component.css']
})
export class AddFichePoliceComponent implements OnInit {

  formGroup!: FormGroup;
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
    private fichePoliceService: FichePoliceService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      lieuNaissance: ['', Validators.required],
      domicile: [''],
      nationalite: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', Validators.email],
      dateArrivee: ['', Validators.required],
      dateDepart: ['', Validators.required],
      hebergeur: ['24'],
      enfant: this.formBuilder.group({
        nom: [''],
        prenom: [''],
        dateNaissance: [''],
        lieuNaissance: [''],
        domicile: [''],
        nationalite: ['']
      })
    });
  }

  onSubmit() {
    this.loading = true;

    const formData = new FormData();

    formData.append('ficp_nom', this.formGroup.get('nom')?.value);
    formData.append('ficp_prenoms', this.formGroup.get('prenom')?.value);
    formData.append('ficp_datenaiss', this.formGroup.get('dateNaissance')?.value);
    formData.append('ficp_lieunaiss', this.formGroup.get('lieuNaissance')?.value);
    formData.append('ficp_domicile', this.formGroup.get('domicile')?.value);
    formData.append('ficp_nationnalite', this.formGroup.get('nationalite')?.value);
    formData.append('ficp_tel', this.formGroup.get('telephone')?.value);
    formData.append('ficp_addresse', this.formGroup.get('email')?.value);
    formData.append('ficp_datearriv', this.formGroup.get('dateArrivee')?.value);
    formData.append('ficp_datedep', this.formGroup.get('dateDepart')?.value);
    formData.append('ficp_heb_id', this.formGroup.get('hebergeur')?.value);
    formData.append('ficp_nomaccomp', this.formGroup.get('enfant.nom')?.value);
    formData.append('ficp_prenaccomp', this.formGroup.get('enfant.prenom')?.value);
    formData.append('ficp_datenaissaccomp', this.formGroup.get('enfant.dateNaissance')?.value);
    formData.append('ficp_lieunaissaccomp', this.formGroup.get('enfant.lieuNaissance')?.value);
    formData.append('ficp_domicileaccomp', this.formGroup.get('enfant.domicile')?.value);
    formData.append('ficp_nationnaliteaccomp', this.formGroup.get('enfant.nationalite')?.value);

    this.fichePoliceService.nouvelleFichePolice(formData).subscribe(
      response => {
        this.loading = false;
        if (response.statut) {
          this.Toast.fire({
            icon: 'success',
            title: response.message
          })
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
