import { TestBed } from '@angular/core/testing';

import { CollapsibleSectionService } from './collapsible-section.service';

describe('CollapsibleSectionService', () => {
  let service: CollapsibleSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollapsibleSectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
