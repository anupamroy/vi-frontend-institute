import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCourseCombinationComponent } from './components/course-combination/add-course-combination/add-course-combination.component';
import { EditCourseCombinationComponent } from './components/course-combination/edit-course-combination/edit-course-combination.component';
import { ViewCourseCombinationComponent } from './components/course-combination/view-course-combination/view-course-combination.component';
import { CourseManagementComponent } from './course-management.component';

const routes: Routes = [
  {
    path: '',
    component: CourseManagementComponent,
    children: [
      {
        path: 'add-course-combination',
        component: AddCourseCombinationComponent
      },
      {
        path: 'edit-course-combination',
        component: EditCourseCombinationComponent
      },
      {
        path: 'list-course-combination',
        component: ViewCourseCombinationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ECourseManagementRoutingModule { }
