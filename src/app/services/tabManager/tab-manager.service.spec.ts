import { TestBed } from '@angular/core/testing';

import { TabManagerService } from './tab-manager.service';

describe('TabManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TabManagerService = TestBed.get(TabManagerService);
    expect(service).toBeTruthy();
  });
});
