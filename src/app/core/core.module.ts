import {NgModule, Optional, SkipSelf} from '@angular/core';
import {AuthorizatedGuard} from "./guards/authorizated.guard";

@NgModule({
  declarations: [  ],
  imports: [],
  providers: [
    AuthorizatedGuard
  ],
  bootstrap: []
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
