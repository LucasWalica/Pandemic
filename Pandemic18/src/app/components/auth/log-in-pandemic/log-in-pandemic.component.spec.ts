import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInPandemicComponent } from './log-in-pandemic.component';

describe('LogInPandemicComponent', () => {
  let component: LogInPandemicComponent;
  let fixture: ComponentFixture<LogInPandemicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogInPandemicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogInPandemicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
