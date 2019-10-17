import { TestBed, inject, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GhostService } from './ghost.service';

describe('GhostService', () => {
  let ghostService: GhostService;
  let httpTestingControler: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        GhostService
      ]
    });

    ghostService = TestBed.get(GhostService);
    httpTestingControler = TestBed.get(HttpTestingController);
  });

  it('should be initialized',
    inject([GhostService, HttpClientTestingModule],
      (ghostService: GhostService, http: HttpClientTestingModule) => {
        expect(ghostService).toBeTruthy();
        expect(http).toBeTruthy();
      }));

  it('Should return and IResponse array', done => {
    // const obs$ = new GhostService()
  });
});
