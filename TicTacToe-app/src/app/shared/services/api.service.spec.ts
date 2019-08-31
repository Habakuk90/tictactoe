import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: []
    });
  });
  it('should be initialized', inject([HttpClientTestingModule], (http: HttpClientTestingModule) => {
    expect(http).toBeTruthy();
  }));
});
