import { TestBed, inject, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GhostService } from './ghost.service';
import { IBrowseOptions, IPostResponseParams, IPageResponseParams } from 'src/app/shared/http/response';
import { of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from 'src/app/core/services/base.service';


describe('GhostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        // {
        //   provide: ActivatedRoute, useValue: {
        //     params: Observable.of({ id: 'test' })
        //   }
        // },
        {
          provide: GhostService, useClass: GhostPageStub
        },
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

  it('ghost methods should be truthy',
    inject([GhostService],
      (ghostService: GhostService) => {
        const params: IBrowseOptions = {
          include: 'authors',
          limit: 3,
          page: 1
        };
        expect(ghostService.getBlogPage('testSlug')).toBeTruthy();
        expect(ghostService.getBlogPages(params)).toBeTruthy();
      }));

  it('shoudl resolve data', fakeAsync(() => {
    var ghostStub: GhostPageStub = new GhostPageStub();
    let data: { data: IPostResponseParams[] } = {
      data: [{
        html: '<div> test html </div>'
      }]
    };

    const spy = spyOn(ghostStub, 'getBlogPages').and.callThrough().and.returnValue(of(data));
    spy(data, (abc) => {
      console.log(abc);
      return abc;
    });
    expect(spy.and.throwError('ERROR')).toThrowError();
    expect(spy.calls.any()).toEqual(true);
    expect(spy.calls.all()).toBeTruthy();
  }));

  it('should throw error', fakeAsync(() => {
    const ghostStub: GhostPageStub = new GhostPageStub();
    const spy = spyOn(ghostStub, 'getBlogPages');
    expect(spy.and.throwError('error')).toThrowError('error');
  }));

  it('should return params', () => {
    const ghostStub: GhostPageStub = new GhostPageStub();

    ghostStub.getHomePage().subscribe(x => {
      var t: IPageResponseParams[];
      console.log(x);
      expect(typeof x).toBe(typeof t);
    });
  });
});

// TODO get a actual testing mock class which doesnt really is different to th actual ghost.service
class GhostPageStub extends BaseService{
/**
 *
 */
constructor() {
  super();
}

  public getBlogPages() {
    const data: IPostResponseParams[] = [];
    data.push({
      html: '<div> test html </div>',
    });
    return of({
      data
    });
  }

  public getHomePage() {
    const data: IPageResponseParams[] = [];
    data.push({
      html: '<div> test html </div>',
      title: 'test title'
    });
    return of(
      data);
  }

  public getBlogPage(): Observable<IPostResponseParams> {
    const data: IPostResponseParams = { html: '<div> test html </div>' };
    return of(data).pipe(catchError(super.handleError));
  }
}
