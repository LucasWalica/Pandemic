import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInPandemicComponent } from './register-in-pandemic.component';

describe('RegisterInPandemicComponent', () => {
  let component: RegisterInPandemicComponent;
  let fixture: ComponentFixture<RegisterInPandemicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterInPandemicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterInPandemicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
