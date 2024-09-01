import { TestBed } from '@angular/core/testing';

import { CallSettingsService } from './call-settings.service';

describe('CallSettingsService', () => {
  let service: CallSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
