import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        // {
        //   provide: ActivatedRoute, useValue: {
        //     params: Observable.of({ id: 'test' })
        //   }
        // },
        ApiService
      ]
    });
  });

  it('should be initialized', inject([, ], (userService: UserService, router: Router) => {
    expect(userService).toBeTruthy();
    expect(router).toBeTruthy();
  }));
});
