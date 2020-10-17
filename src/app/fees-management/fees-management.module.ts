import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeesManagementRoutingModule } from './fees-management-routing.module';
import { FeesManagementComponent } from './fees-management.component';
import { AddFeesHeadComponent } from './components/fees-head/add-fees-head/add-fees-head.component';
import { EditFeesHeadComponent } from './components/fees-head/edit-fees-head/edit-fees-head.component';
import { ListFeesHeadComponent } from './components/fees-head/list-fees-head/list-fees-head.component';


@NgModule({
  declarations: [FeesManagementComponent, AddFeesHeadComponent, EditFeesHeadComponent, ListFeesHeadComponent],
  imports: [
    CommonModule,
    FeesManagementRoutingModule
  ]
})
export class FeesManagementModule { }
