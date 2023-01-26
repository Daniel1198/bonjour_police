import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommissariatService } from 'src/app/services/commissariat/commissariat.service';
import { HebergeurService } from 'src/app/services/hebergeur/hebergeur.service';
import { TypeHebergeurService } from 'src/app/services/type_hebergeur/type-hebergeur.service';
import { VilleService } from 'src/app/services/ville/ville.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-hebergeur',
  templateUrl: './add-hebergeur.component.html',
  styleUrls: ['./add-hebergeur.component.css']
})
export class AddHebergeurComponent implements OnInit {

  typesHebergeur: any[] = [];
  villes: any[] = [];
  commissariats: any[] = [];
  formGroup!: FormGroup;
  previewImage: any;
  loading: boolean = false;
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
    private typeHebergeurService: TypeHebergeurService,
    private villeSevice: VilleService,
    private commissariatService: CommissariatService,
    private hebergeurService: HebergeurService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.initForm();
    this.getAllTypes();
    this.getAllCities();
    this.getOneHotel();
  }

  getOneHotel() {
    if (this.id > 0) {
      this.hebergeurService.listeHebergeur().subscribe(
        response => {
          const hebergeur = response.results.find((hebergeur: any) => hebergeur.heb_id == this.id);
          this.formGroup.patchValue({
            type: hebergeur.heb_type,
            ville: hebergeur.heb_ville,
            commissariat: hebergeur.heb_commissariat,
            designation: hebergeur.heb_designation,
            situationGeo: hebergeur.heb_situationgeo,
            siteWeb: hebergeur.heb_siteweb,
            capacite: hebergeur.heb_capacite,
            gps: hebergeur.heb_gps,
            adresse: hebergeur.heb_addresse,
            email: hebergeur.heb_email,
            tel: hebergeur.heb_tel,
            cel: hebergeur.heb_cel,
            pointFocal: hebergeur.heb_responsable,
            celPointFocal: hebergeur.heb_celresponsable,
          });

          this.previewImage = hebergeur.heb_lienimage;
        }
      )
    }
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

    if (this.id == 0) {
      this.loading = true;
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
          this.hebergeurService.modifierHebergeur(formData).subscribe(
            response => {
              this.loading = false;
              if (response.statut) {
                this.Toast.fire({
                  icon: 'success',
                  title: response.message
                })
                this.router.navigate(['/admin/administration/hebergements']);
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
