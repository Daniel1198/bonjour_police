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

  constructor(
    private fichePoliceService: FichePoliceService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
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
      hebergeur: [''],
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
    formData.append('ficp_heb_id', '24');
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
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: response.message,
            showConfirmButton: false,
            timer: 5000
          });
        }
        else {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: response.message,
            showConfirmButton: false,
            timer: 5000
          });
        }
      }
    );
  }

}
