import { TestBed, inject } from '@angular/core/testing';

import { NomEquipeService } from './nom-equipe.service';

describe('NomEquipeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NomEquipeService]
    });
  });

  it('should be created', inject([NomEquipeService], (service: NomEquipeService) => {
    expect(service).toBeTruthy();
  }));
});
