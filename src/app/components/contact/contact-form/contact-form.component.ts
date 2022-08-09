import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Contact} from "../../../types/contact";
import {of} from "rxjs";
import {ContactService} from "../../../services/contact.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  contactFormGroup: FormGroup

  isEdit: boolean = false
  showAlert: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.buildForm()

    const {data} = this.activatedRoute.snapshot
    this.setupEditMode(data)
  }

  buildForm() {
    this.contactFormGroup = this.formBuilder.group({
      id: [{value: null, disabled: true}],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      address: ['', [Validators.required]],
      country: ['', [Validators.required]]
    })
  }

  setupEditMode(data: any) {
    if (data.contact) {
      this.isEdit = true
      this.contactFormGroup.patchValue(data.contact)
    }
  }

  onSubmit(){
    this.contactFormGroup.markAllAsTouched()
    if (this.contactFormGroup.invalid) {
      this.showAlert = true
      scroll({top: 0, behavior: 'smooth'})
      setTimeout(() => this.showAlert = false, 3000)
      return
    }

    const submitData = this.contactFormGroup.getRawValue()
    const addOrEditObservable = this.isEdit ?
      this.contactService.updateContact(submitData) : this.contactService.addContact(submitData)

    addOrEditObservable.subscribe({
      next: (res) => {
        this.router.navigate(['/contactos'])
        this.toastr.success(res,
          this.isEdit ? 'Contacto actualizado' : 'Contacto registado'
        );
      },
      error: () => {
        this.toastr.error(
          this.isEdit ? 'Error al actualizar contacto' : "Error al agregar contacto",
          "Error")
      }
    })
  }

  //#region Getters Controls
  get name() {
    return this.contactFormGroup.get('name') as FormControl;
  }

  get lastName() {
    return this.contactFormGroup.get('lastName') as FormControl;
  }

  get phoneNumber() {
    return this.contactFormGroup.get('phoneNumber') as FormControl;
  }

  get address() {
    return this.contactFormGroup.get('address') as FormControl;
  }

  get country() {
    return this.contactFormGroup.get('country') as FormControl;
  }

  //#endregion

}
