import { TestBed, inject, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GhostService } from './ghost.service';

describe('GhostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpClientTestingModule,
      ]
    });
  });

  beforeEach(() => {

  });

  it('should be initialized',
    inject([GhostService, HttpClientTestingModule],
      (ghostService: GhostService, http: HttpClientTestingModule) => {
        expect(ghostService).toBeTruthy();
        expect(http).toBeTruthy();
      }));
});
