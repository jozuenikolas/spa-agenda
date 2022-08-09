import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Contact} from "../types/contact";
import {delay, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  url = "http://localhost:3000/contacto/"

  constructor(private http: HttpClient) {
  }

  /**
   * Get the contact list
   * @returns Promise<Contact[]>
   * @method Get
   */
  getContactList(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.url)
  }

  /**
   * Get contact by their ID
   * @param id the contact ID
   * @returns Promise<Contact>
   * @method Get
   */
  getContactById(id: number): Observable<Contact> {
    return this.http.get<Contact>(this.url + id).pipe(delay(1))
  }

  /**
   * Add a new contact
   * @param contact the new contact object
   * @returns Promise<string>
   * @method Post
   */
  addContact(contact: Contact): Observable<string> {
    return this.http.post<string>(this.url, contact)
  }

  /**
   * Add a new contact
   * @param contact the new contact object
   * @returns Promise<string>
   * @method Put
   */
  updateContact(contact: Contact): Observable<string> {
    return this.http.put<string>(this.url + contact.id, contact)
  }

}
