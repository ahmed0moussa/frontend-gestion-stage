import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionStageComponent } from './description-stage.component';

describe('DescriptionStageComponent', () => {
  let component: DescriptionStageComponent;
  let fixture: ComponentFixture<DescriptionStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescriptionStageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DescriptionStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
