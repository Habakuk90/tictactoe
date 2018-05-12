import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

    _apiURI: String;

    constructor() {
        this._apiURI = 'http://localhost:50809/api';
     }

     getApiURI() {
         return this._apiURI;
     }
}
