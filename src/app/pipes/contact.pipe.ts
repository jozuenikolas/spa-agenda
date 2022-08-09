import {Pipe, PipeTransform} from '@angular/core';
import {Contact} from "../types/contact";

@Pipe({
  name: 'contact'
})
export class ContactPipe implements PipeTransform {

  transform(value: Contact[], nameFilter: string, countryFilter: string): Contact[] {
    let returnArray = value

    if (!value) {
      return value
    } else {
      nameFilter = nameFilter.toUpperCase()
      returnArray = returnArray.filter(({name, lastName}) =>
        ((name + " " + lastName).toUpperCase() ||
          (lastName + " " + name).toUpperCase() ||
          name.toUpperCase() || lastName.toUpperCase()
        ).includes(nameFilter)
      )

      if (countryFilter) {
        returnArray = returnArray.filter(({country}) =>
          country === countryFilter
        )
      }
    }

    return returnArray;
  }

}
