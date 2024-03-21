import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerNvPasswordComponent } from './creer-nv-password.component';

describe('CreerNvPasswordComponent', () => {
  let component: CreerNvPasswordComponent;
  let fixture: ComponentFixture<CreerNvPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreerNvPasswordComponent]
    });
    fixture = TestBed.createComponent(CreerNvPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
