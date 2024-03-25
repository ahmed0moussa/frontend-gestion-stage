import { TestBed } from '@angular/core/testing';

import { GestionRolesService } from './gestion-roles.service';

describe('GestionRolesService', () => {
  let service: GestionRolesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionRolesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
