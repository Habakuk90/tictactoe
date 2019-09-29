import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { throwIfAlreadyLoaded } from './guard/module-import.guard';
import { GhostInterceptor } from '../shared/http/ghost.interceptor';


@NgModule({
    imports: [
        HttpClientModule,
    ],
    exports: [
    ],
    providers: [
        // HttpClientModule,
        { provide: HTTP_INTERCEPTORS, useClass: GhostInterceptor, multi: true}
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
