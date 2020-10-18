import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMastersComponent } from './components/add-masters/add-masters.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AddAssociatedPostComponent } from './components/associated-post/add-associated-post/add-associated-post.component';
import { EditAssociatedPostComponent } from './components/associated-post/edit-associated-post/edit-associated-post.component';
import { ListAssociatedPostComponent } from './components/associated-post/list-associated-post/list-associated-post.component';
import { EditMastersComponent } from './components/edit-masters/edit-masters.component';
import { EditInstituteTypeComponent } from './components/institute-type/edit-institute-type/edit-institute-type.component';
import { InstituteTypeComponent } from './components/institute-type/institute-type/institute-type.component';
import { ListInstituteTypeComponent } from './components/institute-type/list-institute-type/list-institute-type.component';
import { AddOrgCategoryComponent } from './components/org-category/add-org-category/add-org-category.component';
import { EditOrgCategoryComponent } from './components/org-category/edit-org-category/edit-org-category.component';
import { ViewOrgCategoryComponent } from './components/org-category/view-org-category/view-org-category.component';
import { ViewMastersComponent } from './components/view-masters/view-masters.component';
import { OrganizationComponent } from './organization.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizationComponent,
    children: [
      {
        path: 'add-masters',
        component: AddMastersComponent,
      },
      {
        path: 'view-masters',
        component: ViewMastersComponent,
      },
      {
        path: 'edit-masters',
        component: EditMastersComponent,
      },
      { path: 'add-institute-type', component: InstituteTypeComponent },
      { path: '', component: AdminDashboardComponent },
      { path: 'add-org-category', component: AddOrgCategoryComponent}
    ],
  },

  { path: 'list-institute-type', component: ListInstituteTypeComponent },
  {
    path: 'edit-institute-type/:itemId/:instituteType',
    component: EditInstituteTypeComponent,
  },
  { path: 'add-associated-post', component: AddAssociatedPostComponent },
  { path: 'edit-associated-post/:id', component: EditAssociatedPostComponent },
  { path: 'list-associated-post', component: ListAssociatedPostComponent },
  { path: 'list-org-category', component: ViewOrgCategoryComponent },
  { path: 'edit-org-category/:itemId/:orgCategory', component: EditOrgCategoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationRoutingModule {}
