import { TestBed } from '@angular/core/testing';

import { ImpactFamiliesService } from './impact-families.service';

describe('ImpactFamiliesService', () => {
  let service: ImpactFamiliesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpactFamiliesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
