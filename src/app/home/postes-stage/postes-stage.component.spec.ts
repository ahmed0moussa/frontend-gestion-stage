import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostesStageComponent } from './postes-stage.component';

describe('PostesStageComponent', () => {
  let component: PostesStageComponent;
  let fixture: ComponentFixture<PostesStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostesStageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostesStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
