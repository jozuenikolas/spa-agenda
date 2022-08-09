import {ContactResolver} from './contact.resolver';
import {ActivatedRouteSnapshot, Router} from "@angular/router";
import {ContactService} from "../services/contact.service";
import {Contact} from "../types/contact";
import {of} from "rxjs";
import {ToastrService} from "ngx-toastr";

describe('ContactResolver', () => {
  let contactResolver: ContactResolver;
  let contactServiceSpy: jasmine.SpyObj<ContactService>
  let activatedRouteSnapshot: ActivatedRouteSnapshot
  let routerSpy: jasmine.SpyObj<Router>
  let toastrSpy: jasmine.SpyObj<ToastrService>

  beforeEach(() => {
    contactServiceSpy = jasmine.createSpyObj('ContactService', [
      'getContactById'
    ])
    routerSpy = jasmine.createSpyObj('Router', [
      'navigate'
    ])
    toastrSpy = jasmine.createSpyObj('ToastrService', [
      'error'
    ])
    contactResolver = new ContactResolver(contactServiceSpy, routerSpy, toastrSpy)
    activatedRouteSnapshot = new ActivatedRouteSnapshot()
  });

  it('should be created', () => {
    expect(contactResolver).toBeTruthy();
  });

  it('should return expected contact by id and fn[getContactById] should call once', (done: DoneFn) => {
    const expectedContact: Contact = {
      id: 1,
      name: 'AA',
      lastName: 'BB',
      phoneNumber: 98784512,
      address: 'CC',
      country: 'DD'
    }

    contactServiceSpy.getContactById.and.returnValue(of(expectedContact));

    activatedRouteSnapshot.params = {id: 1}

    contactResolver.resolve(activatedRouteSnapshot, null).subscribe({
      next: contact => {
        expect(contact)
          .withContext('expected contact')
          .toEqual(expectedContact);
        done();
      },
      error: done.fail
    })

    expect(contactServiceSpy.getContactById.calls.count())
      .withContext('one call')
      .toBe(1);

  });

});
