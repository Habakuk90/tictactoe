// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  signalR: {
    baseUrl: 'http://localhost:8081/api',
  },
  ghost: {
    baseUrl: 'http://localhost:2368/',
    contentApiUrl: 'ghost/api/v2/content/',
    apiKey: '13a1a657ee4a8bfd891d99089a'
  }
};


/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
