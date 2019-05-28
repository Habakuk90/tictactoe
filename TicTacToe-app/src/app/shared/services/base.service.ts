import { throwError, BehaviorSubject } from 'rxjs';

export abstract class BaseService {
  // todoandi muss das hier?
  public _HomeStateSubject = new BehaviorSubject<number>(0);
  constructor() {}

  protected handleError(error: any) {
    const applicationError = error.headers.get('Application-Error');

    console.log(applicationError);
    // [TODO] Error richtig auswerten
    if (applicationError) {
      return throwError(applicationError);
    }

    let modelStateErrors: String = '';
    const serverError = JSON.parse(error.error);
    const errorMessage = [];
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
