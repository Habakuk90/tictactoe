import { TestBed, inject, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GhostService } from './ghost.service';
import { IResponse } from 'src/app/shared/http/responseParams';
import { IBrowseOptions } from '../http/browseParams';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GhostInterceptor } from '../http/ghost.interceptor';
describe('GhostService', () => {
  let ghostService: GhostService;
  let httpTestingControler: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        GhostService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: GhostInterceptor,
          multi: true,
        },
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
    const options: IBrowseOptions = {
      filter: `tag:${'styleguide'}`,
      formats: 'html,plaintext',
    };
    const getPages$ = ghostService.getPages(options);
    getPages$.subscribe(response => {
      expect(instanceOfIResponse(response)).toBe(true);
      done();
    });

  });






  function instanceOfIResponse(object: Array<IResponse>): object is IResponse[] {
    const isArray = (object instanceof Array);
    let areEntriesIResponse: boolean;
    object.forEach(entry => {
      areEntriesIResponse = 'id' in entry &&
      'uuid' in entry &&
      'title' in entry &&
      'html' in entry &&
      'slug' in entry &&
      'url' in entry;
    });

    return isArray && areEntriesIResponse;
  }
});

class GhostMockService {

  getPages(): IResponse[] {
    return new Array<IResponse>();
  }
}
