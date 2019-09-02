import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'src/app/app-routing.module';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(routes)],
      providers: [UserService, {provide: Router, useClass: RouterTestingModule}]
    });
  });

  it('should be initialized', inject([UserService, Router], (userService: UserService, router: Router) => {
    expect(userService).toBeTruthy();
    expect(router).toBeTruthy();
  }));
});
