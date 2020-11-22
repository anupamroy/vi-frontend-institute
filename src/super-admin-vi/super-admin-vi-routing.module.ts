import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddSubjectTypeComponent } from './masters/subject-type/add-subject-type/add-subject-type.component';
import { SuperAdminViComponent } from './super-admin-vi.component';

const routes: Routes = [
  {
    path : '',
    component : SuperAdminViComponent,
    children:[
      {
        path: 'add-subject-type',
        component : AddSubjectTypeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminViRoutingModule { }
