import { Observable, throwError } from 'rxjs';

export abstract class BaseService {
  constructor() {}

  protected handleError(error: any) {
    const applicationError = error.headers.get('Application-Error');
    // [TODO] Error richtig auswerten
    if (applicationError) {
      return throwError(applicationError);
    }

    let modelStateErrors: String = '';
    const serverError = JSON.parse(error.error);
    let errorMessage = [];
    if (!serverError.type) {
      for (const key in serverError) {
        if (serverError[key]) {
          modelStateErrors += serverError[key];
          errorMessage.push(serverError[key]);
        }
      }
    }

    modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
    return throwError(errorMessage || 'Server error');
  }
}
