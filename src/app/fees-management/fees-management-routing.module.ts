import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListFeesHeadComponent } from './components/fees-head/list-fees-head/list-fees-head.component';
import { FeesManagementComponent } from './fees-management.component';

const routes: Routes = [
  { path: '', component: FeesManagementComponent },
  { path: 'fees-head', component: ListFeesHeadComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FeesManagementRoutingModule { }
