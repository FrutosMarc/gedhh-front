import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionUtilisateurRootComponent } from './gestion-utilisateur-root.component';

describe('GestionUtilisateurRootComponent', () => {
  let component: GestionUtilisateurRootComponent;
  let fixture: ComponentFixture<GestionUtilisateurRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionUtilisateurRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionUtilisateurRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
