import { NgModule, ApplicationRef, ChangeDetectorRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { TooltipModule, AlertModule, TabsModule, ModalModule, DropdownModule } from 'ng2-bootstrap/ng2-bootstrap';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { AppComponent } from './app.component';
import { AboutComponent } from './about';
import { EventComponent } from './event';
import { EventCenterComponent } from './event/center';
import { TagComponent } from './tag';
import { TagCenterComponent } from './tag/center';
import { LoginComponent } from './login';
import { LogoutComponent } from './logout';
import { RegisterComponent } from './register';
import { AdminComponent } from './admin';
import { TagAdminComponent } from './admin/tag';
import { NewsAdminComponent } from './admin/news';
import { EventAdminComponent } from './admin/event';
import { UserAdminComponent } from './admin/user';
import { routing, appRoutingProviders } from './app.routing';

import { GlobalService } from './global';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    TooltipModule,
    AlertModule,
    TabsModule,
    ModalModule,
    DropdownModule
  ],
  declarations: [
    AppComponent,
    AboutComponent,
    EventComponent,
    EventCenterComponent,
    TagComponent,
    TagCenterComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    AdminComponent,
    TagAdminComponent,
    NewsAdminComponent,
    EventAdminComponent,
    UserAdminComponent
  ],
  providers: [
    CookieService,
    GlobalService,
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
