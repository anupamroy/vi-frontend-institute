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

/* Configure Amplify resources */
Amplify.configure(awsconfig);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{provide : HTTP_INTERCEPTORS, useClass: ReqInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
