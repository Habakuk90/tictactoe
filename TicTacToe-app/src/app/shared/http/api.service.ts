import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { IApiEndpoint, Endpoint } from './endpoints';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {

  }


  //  item = response type
  browse<T extends Params>(item: IApiEndpoint, responeType: Response = null, count: number = 15): Observable<T> {

    return this.http.get<T>(item.fullUrl)
      .pipe(take(count));
  }

  read() {

  }

  add<T>() {

  }

  edit<T>() {

  }

  destory<T>() {

  }
}
