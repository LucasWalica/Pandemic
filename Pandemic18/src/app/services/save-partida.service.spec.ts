import { TestBed } from '@angular/core/testing';

import { SavePartidaService } from './save-partida.service';

describe('SavePartidaService', () => {
  let service: SavePartidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavePartidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
