import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteMainPageComponent } from './quote-main-page.component';

describe('QuoteMainPageComponent', () => {
  let component: QuoteMainPageComponent;
  let fixture: ComponentFixture<QuoteMainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteMainPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
