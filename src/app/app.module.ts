import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";
import {PublicModule} from "./public/public.module";
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app.routing";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    CoreModule,
    SharedModule,
    PublicModule,

    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
