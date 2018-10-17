import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class ConfigService {

    _apiURI: String;

    constructor() {
        this._apiURI = environment.baseUrl + '/api';
     }

     getApiURI() {
         return this._apiURI;
     }
}
