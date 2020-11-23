import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { ECourseManagementRoutingModule } from './e-course-management-routing.module';
import { CourseManagementComponent } from './course-management.component';
import { AddCourseCombinationComponent } from './components/course-combination/add-course-combination/add-course-combination.component';
import { EditCourseCombinationComponent } from './components/course-combination/edit-course-combination/edit-course-combination.component';
import { ViewCourseCombinationComponent } from './components/course-combination/view-course-combination/view-course-combination.component';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    CourseManagementComponent,
    AddCourseCombinationComponent,
    EditCourseCombinationComponent,
    ViewCourseCombinationComponent,
  ],
  imports: [
    CommonModule,
    ECourseManagementRoutingModule,
    FormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule

  ]
})
export class ECourseManagementModule { }
