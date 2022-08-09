import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PageErrorComponent} from './page-error.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('PageErrorComponent', () => {
  let component: PageErrorComponent;
  let fixture: ComponentFixture<PageErrorComponent>;
  let compiled: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageErrorComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show an image', () => {
    const imageExpect = {
      name: 'users-oops',
      photoUrl: 'assets/images/users-oops.png',
    };
    const image = compiled.querySelector('img')
    expect(image.src).toContain(imageExpect.photoUrl)
  });

  it('should display the first part of the text', () => {
    const textEcpect = " ¡Ooops! Página no disponible "
    const text = compiled.querySelector('#text1').textContent
    expect(text).toEqual(textEcpect)
  });

  it('should display the second part of the text', () => {
    const textEcpect = " Es posible que el enlace que seleccionaste esté roto o que se haya eliminado la página. "
    const text = compiled.querySelector('#text2').textContent
    expect(text).toEqual(textEcpect)
  })
});
