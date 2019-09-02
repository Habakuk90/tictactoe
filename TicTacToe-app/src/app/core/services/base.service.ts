import { throwError } from 'rxjs';

export abstract class BaseService {
  constructor() {}

  protected handleError(error: any) {
    return throwError(error || 'Server error');
  }
}
