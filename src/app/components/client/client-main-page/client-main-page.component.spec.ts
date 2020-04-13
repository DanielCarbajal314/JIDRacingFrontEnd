import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMainPageComponent } from './client-main-page.component';

describe('ClientMainPageComponent', () => {
  let component: ClientMainPageComponent;
  let fixture: ComponentFixture<ClientMainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientMainPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
