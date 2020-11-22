import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperAdminViComponent } from './super-admin-vi.component';
import { AddSubjectTypeComponent } from './masters/subject-type/add-subject-type/add-subject-type.component'
import { FormsModule } from '@angular/forms';
import { SuperAdminViRoutingModule } from '../super-admin-vi/super-admin-vi-routing.module'

@NgModule({
  declarations: [
    SuperAdminViComponent,
    AddSubjectTypeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SuperAdminViRoutingModule
  ]
})
export class SuperAdminViModule { }
