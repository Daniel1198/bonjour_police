import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FichePoliceService } from 'src/app/services/fiche-police/fiche-police.service';
import { NationaliteService } from 'src/app/services/nationalite.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-fiche-police',
  templateUrl: './add-fiche-police.component.html',
  styleUrls: ['./add-fiche-police.component.css']
})
export class AddFichePoliceComponent implements OnInit {

  formGroup!: FormGroup;
  loading: boolean = false;
  hebId!: string;
  nationalites: any[] = [];
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
    private fichePoliceService: FichePoliceService,
    private formBuilder: FormBuilder,
    private nationaliteService: NationaliteService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.hebId = localStorage.getItem('user_heb_id')!;
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.initForm();
    this.nationalites = this.nationaliteService.nationalites;
    this.getOneFiche();
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      id: [''],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      lieuNaissance: ['', Validators.required],
      domicile: ['', Validators.required],
      nationalite: ['', Validators.required],
      telephone: ['', Validators.required],
      email: [''],
      dateArrivee: ['', Validators.required],
      dateDepart: ['', Validators.required],
      hebergeur: [this.hebId],
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

  getOneFiche() {
    if (this.id > 0) {
      this.fichePoliceService.listeFichePolice().subscribe(
        response => {
          const fp = response.results.find((fp: any) => fp.ficp_id == this.id);
            this.formGroup.patchValue({
              id: fp.ficp_id,
              nom: fp.ficp_nom,
              prenom: fp.ficp_prenoms,
              dateNaissance: fp.ficp_datenaiss,
              lieuNaissance: fp.ficp_lieunaiss,
              domicile: fp.ficp_domicile,
              nationalite: fp.ficp_nationnalite,
              telephone: fp.ficp_tel,
              email: fp.ficp_addresse,
              dateArrivee: fp.ficp_datearriv,
              dateDepart: fp.ficp_datedep,
              enfant: this.formBuilder.group({
                nom: fp.ficp_nomaccomp,
                prenom: fp.ficp_prenaccomp,
                dateNaissance: fp.ficp_datenaissaccomp,
                lieuNaissance: fp.ficp_lieunaissaccomp,
                domicile: fp.ficp_domicileaccomp,
                nationalite: fp.ficp_nationnaliteaccomp
              })
            }
          );
        }
      )

      this.formGroup.disable()
    }
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
    formData.append('ficp_heb_id', this.hebId);
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
            title: 'Fiche créée avec succès.'
          })
          this.formGroup.reset();
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

  onBack() {
    history.back();
  }

}
