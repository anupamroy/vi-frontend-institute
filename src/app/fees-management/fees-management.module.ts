import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeesManagementRoutingModule } from './fees-management-routing.module';
import { FeesManagementComponent } from './fees-management.component';
import { AddFeesHeadComponent } from './components/fees-head/add-fees-head/add-fees-head.component';
import { EditFeesHeadComponent } from './components/fees-head/edit-fees-head/edit-fees-head.component';
import { ListFeesHeadComponent } from './components/fees-head/list-fees-head/list-fees-head.component';
import { AddFeesMastersComponent } from './super-admin/add-fees-masters/add-fees-masters.component';
import { EditFeesMastersComponent } from './super-admin/edit-fees-masters/edit-fees-masters.component';
import { ListFeesMastersComponent } from './super-admin/list-fees-masters/list-fees-masters.component';
import { AddCourseCombinationComponent } from './super-admin/add-course-combination/add-course-combination.component';
import { ListCourseCombinationComponent } from './super-admin/list-course-combination/list-course-combination.component';
import { EditCourseCombinationComponent } from './super-admin/edit-course-combination/edit-course-combination.component';

@NgModule({
  declarations: [
    FeesManagementComponent,
    AddFeesHeadComponent,
    EditFeesHeadComponent,
    ListFeesHeadComponent,
    AddFeesMastersComponent,
    EditFeesMastersComponent,
    ListFeesMastersComponent,
    AddCourseCombinationComponent,
    ListCourseCombinationComponent,
    EditCourseCombinationComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FeesManagementRoutingModule,FormsModule],
})
export class FeesManagementModule {}
