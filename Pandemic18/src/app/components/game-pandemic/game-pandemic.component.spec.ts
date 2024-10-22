import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePandemicComponent } from './game-pandemic.component';

describe('GamePandemicComponent', () => {
  let component: GamePandemicComponent;
  let fixture: ComponentFixture<GamePandemicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamePandemicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamePandemicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
