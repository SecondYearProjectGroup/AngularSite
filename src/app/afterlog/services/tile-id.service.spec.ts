import { TestBed } from '@angular/core/testing';

import { TileIdService } from './tile-id.service';

describe('TileIdService', () => {
  let service: TileIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TileIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
