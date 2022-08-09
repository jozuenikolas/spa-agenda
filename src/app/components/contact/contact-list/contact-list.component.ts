import {Component, OnInit} from '@angular/core';
import {ContactService} from "../../../services/contact.service";
import {catchError, Observable} from "rxjs";
import {Contact} from "../../../types/contact";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  contactList$: Observable<Contact[]>

  columns: string[]

  nameFilter = new FormControl('')
  countryFilter = new FormControl('')

  showSpinner: boolean = true

  constructor(private contactService: ContactService) {
    this.setConfigTable()
    this.contactList$ = this.contactService.getContactList().pipe(
      catchError(() => {
        this.showSpinner = false
        return []
      })
    )
  }

  ngOnInit(): void {

    this.nameFilter.valueChanges
      .subscribe(value => {
        console.log("nameFilter", value)
      })

    this.countryFilter.valueChanges
      .subscribe(value => {
        console.log("countryFilter", value)
      })
  }

  setConfigTable() {
    this.columns = [
      'Nombre',
      'Teléfono',
      'País',
      'Acciones',
    ]
  }

}
