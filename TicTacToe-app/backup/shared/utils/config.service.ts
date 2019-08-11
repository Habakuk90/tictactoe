import { environment } from 'src/environments/environment';

export class ConfigService {

    _apiURI: String;

    constructor() {
      let hostname = location.host;
      if (hostname.indexOf(':') > 0) {
        hostname = hostname.substr(0, hostname.indexOf(':'));
      }
        this._apiURI = environment.baseUrl;
     }
}
