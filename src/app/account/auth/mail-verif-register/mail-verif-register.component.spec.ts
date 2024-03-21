import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailVerifRegisterComponent } from './mail-verif-register.component';

describe('MailVerifRegisterComponent', () => {
  let component: MailVerifRegisterComponent;
  let fixture: ComponentFixture<MailVerifRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MailVerifRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MailVerifRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
