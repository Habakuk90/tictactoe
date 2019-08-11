// include directives/components commonly used in features modules in this shared modules
// and import me into the feature module
// importing them individually results in: Type xxx is part of the declarations of 2 modules:
// ... Please consider moving to a higher module...
// https://github.com/angular/angular/issues/10646

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HubService } from '../connections/hub.service';
import { NgForTrackByIdDirective } from '../utils/ng-for-track-by-id.directive';


@NgModule({
  imports:      [],
  declarations: [],
  exports:      [CommonModule],
  providers:    [HubService, NgForTrackByIdDirective]
})
export class SharedModule { }
