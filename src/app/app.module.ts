import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AdminDashboardComponent } from './Organization A/admin-dashboard/admin-dashboard.component';
import { AddDashboardComponent } from './Organization A/add-dashboard/add-dashboard.component';
import { EditInstituteTypeComponent } from './Organization A/Institute Type/edit-institute-type/edit-institute-type.component';
import { InstituteTypeComponent } from './Organization A/Institute Type/institute-type/institute-type.component';
import { ListInstituteTypeComponent } from './Organization A/Institute Type/list-institute-type/list-institute-type.component'

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    AddDashboardComponent,
    EditInstituteTypeComponent,
    InstituteTypeComponent,
    ListInstituteTypeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
