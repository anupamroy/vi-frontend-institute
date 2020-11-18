import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ReqInterceptorService } from "./shared/Services/req-interceptor.service";


/* Add Amplify imports */
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SellerComponent } from './org-admin/seller/seller.component';
import { InstituteComponent } from './org-admin/institute/institute.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SellerDashboardComponent } from './org-admin/seller-dashboard/seller-dashboard.component';
import { InstituteDashboardComponent } from './org-admin/institute-dashboard/institute-dashboard.component';

/* Configure Amplify resources */
Amplify.configure(awsconfig);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SellerComponent,
    InstituteComponent,
    SellerDashboardComponent,
    InstituteDashboardComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{provide : HTTP_INTERCEPTORS, useClass: ReqInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
