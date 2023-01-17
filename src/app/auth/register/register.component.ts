import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommissariatService } from 'src/app/services/commissariat/commissariat.service';
import { HebergeurService } from 'src/app/services/hebergeur/hebergeur.service';
import { TypeHebergeurService } from 'src/app/services/type_hebergeur/type-hebergeur.service';
import { VilleService } from 'src/app/services/ville/ville.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  typesHebergeur: any[] = [];
  villes: any[] = [];
  commissariats: any[] = [];
  formGroup!: FormGroup;
  previewImage: any;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private typeHebergeurService: TypeHebergeurService,
    private villeSevice: VilleService,
    private commissariatService: CommissariatService,
    private hebergeurService: HebergeurService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getAllTypes();
    this.getAllCities();
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      type: ['', Validators.required],
      ville: ['', Validators.required],
      commissariat: ['', Validators.required],
      designation: ['', Validators.required],
      situationGeo: ['', Validators.required],
      siteWeb: [''],
      capacite: [''],
      gps: [''],
      adresse: [''],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', Validators.required],
      cel: ['', Validators.required],
      pointFocal: [''],
      celPointFocal: [''],
      image: [''],
    });
  }

  onSubmit() {
  
    this.loading = true;
    const formData = new FormData();

    formData.append('heb_type', this.formGroup.get('type')?.value);
    formData.append('heb_ville', this.formGroup.get('ville')?.value);
    formData.append('heb_commissariat', this.formGroup.get('commissariat')?.value);
    formData.append('heb_designation', this.formGroup.get('designation')?.value);
    formData.append('heb_situationgeo', this.formGroup.get('situationGeo')?.value);
    formData.append('heb_siteweb', this.formGroup.get('siteWeb')?.value);
    formData.append('heb_capacite', this.formGroup.get('capacite')?.value);
    formData.append('heb_gps', this.formGroup.get('gps')?.value);
    formData.append('heb_addresse', this.formGroup.get('adresse')?.value);
    formData.append('heb_email', this.formGroup.get('email')?.value);
    formData.append('heb_tel', this.formGroup.get('tel')?.value);
    formData.append('heb_cel', this.formGroup.get('cel')?.value);
    formData.append('heb_responsable', this.formGroup.get('pointFocal')?.value);
    formData.append('heb_celresponsable', this.formGroup.get('celPointFocal')?.value);
    formData.append('heb_lienimage', this.formGroup.get('image')?.value);

    this.hebergeurService.nouvelHebergeur(formData).subscribe(
      response => {
        this.loading = false;
        if (response.statut) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Hébergeur enregistré avec succès !',
            html: 'Email : <b>'+ this.formGroup.get('email')?.value +'</b><br>'+
            'Mot de passe : <b>password</b>',
            showConfirmButton: true
          });
          this.formGroup.reset();
        }
        else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Oops...',
            text: response.message,
            showConfirmButton: true
          });
        }
      }
    );
  }

  // récupération puis affichage de la photo sélectionnée
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      var reader = new FileReader();
      reader.onload = (e) => this.previewImage = e.target?.result;
      reader.readAsDataURL(file);
      
      this.formGroup.patchValue({
        image: file
      });
    }
  }

  getAllTypes() {
    this.typeHebergeurService.listeType().subscribe(
      response => {
        this.typesHebergeur = response.results;
      }
    );
  }

  getAllCities() {
    this.villeSevice.listeVille().subscribe(
      response => {
        this.villes = response.results;
      }
    );
  }

  getPolicesByCity(villeLib: string) {
    this.commissariatService.commissariatParVille(villeLib).subscribe(
      response => {
        this.commissariats = response.results
      }
    );
  }

}
