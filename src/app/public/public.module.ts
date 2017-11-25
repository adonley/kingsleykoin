import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {SharedModule} from "../shared/shared.module";
import {PublicRoutingModule} from "./public.routing";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    PublicRoutingModule,
    CommonModule,
    RouterModule,

    SharedModule,
  ],
  declarations: [
    HomeComponent,
  ]
})
export class PublicModule { }
