import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {catchError, Observable, of} from 'rxjs';
import {ContactService} from "../services/contact.service";
import {Contact} from "../types/contact";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ContactResolver implements Resolve<Contact> {

  constructor(
    private contactService: ContactService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Contact> {
    const {id} = route.params
    return this.contactService.getContactById(id).pipe(
      catchError(() => {
        this.toastr.error("Contacto no encontrado", "Error")
        this.router.navigate(['page-error'])
        return of(null)
      })
    )
  }
}
