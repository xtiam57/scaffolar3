import { TestBed } from '@angular/core/testing';

import { ChartBuilderService } from './chart-builder.service';

describe('ChartBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChartBuilderService = TestBed.get(ChartBuilderService);
    expect(service).toBeTruthy();
  });
});
