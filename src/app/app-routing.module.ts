import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContactListComponent} from "./components/contact/contact-list/contact-list.component";
import {ContactFormComponent} from "./components/contact/contact-form/contact-form.component";
import {ContactResolver} from "./resolvers/contact.resolver";

const routes: Routes = [
  {
    path: 'contactos',
    children: [
      {
        path: '',
        component: ContactListComponent
      },
      {
        path: 'crear',
        component: ContactFormComponent
      },
      {
        path: 'editar/:id',
        component: ContactFormComponent,
        resolve: {
          contacto: ContactResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
