import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAccountsHeadComponent } from './components/accounts-head/add-accounts-head/add-accounts-head.component';
import { EditAccountsHeadComponent } from './components/accounts-head/edit-accounts-head/edit-accounts-head.component';
import { ListAccountsHeadComponent } from './components/accounts-head/list-accounts-head/list-accounts-head.component';
import { AddMastersComponent } from './components/add-masters/add-masters.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AddAssociatedPostComponent } from './components/associated-post/add-associated-post/add-associated-post.component';
import { EditAssociatedPostComponent } from './components/associated-post/edit-associated-post/edit-associated-post.component';
import { ListAssociatedPostComponent } from './components/associated-post/list-associated-post/list-associated-post.component';
import { EditMastersComponent } from './components/edit-masters/edit-masters.component';
import { AddFeesTypeComponent } from './components/fees-type/add-fees-type/add-fees-type.component';
import { EditFeesTypeComponent } from './components/fees-type/edit-fees-type/edit-fees-type.component';
import { ListFeesTypeComponent } from './components/fees-type/list-fees-type/list-fees-type.component';
import { EditInstituteTypeComponent } from './components/institute-type/edit-institute-type/edit-institute-type.component';
import { InstituteTypeComponent } from './components/institute-type/institute-type/institute-type.component';
import { ListInstituteTypeComponent } from './components/institute-type/list-institute-type/list-institute-type.component';
import { AddOrgCategoryComponent } from './components/org-category/add-org-category/add-org-category.component';
import { EditOrgCategoryComponent } from './components/org-category/edit-org-category/edit-org-category.component';
import { ViewOrgCategoryComponent } from './components/org-category/view-org-category/view-org-category.component';
import { ViewMastersComponent } from './components/view-masters/view-masters.component';
import { OrganizationComponent } from './organization.component';
import { AddModuleComponent } from './components/module/add-module/add-module.component';
import { EditModuleComponent } from './components/module/edit-module/edit-module.component';
import { ListModuleComponent } from './components/module/list-module/list-module.component';
import { ListOrganizationComponent } from './components/list-organization/list-organization.component';
import { AddPackageComponent } from './components/packages-master/add-package/add-package.component';
import { ListPackageComponent } from './components/packages-master/list-package/list-package.component';
import { EditPackageComponent } from './components/packages-master/edit-package/edit-package.component';
// import { AddOrganizationComponent } from './components/add-organization/add-organization.component';
import { EditOrganizationComponent } from './components/edit-organization/edit-organization.component';
import { AddStreamComponent } from './components/stream-master/add-stream/add-stream.component';
import { ViewStreamComponent } from './components/stream-master/view-stream/view-stream.component';
import { EditStreamComponent } from './components/stream-master/edit-stream/edit-stream.component';
import { AddSubjectAttributesComponent } from './components/subject-attributes-master/add-subject-attributes/add-subject-attributes.component';
import { EditSubjectAttributesComponent } from './components/subject-attributes-master/edit-subject-attributes/edit-subject-attributes.component';
import { ViewSubjectAttributesComponent } from './components/subject-attributes-master/view-subject-attributes/view-subject-attributes.component';
// import { AddSubjectTypeComponent } from './components/subject-type/add-subject-type/add-subject-type.component';
// import { EditSubjectTypeComponent } from './components/subject-type/edit-subject-type/edit-subject-type.component';
//import { ListSubjectTypeComponent } from './components/subject-type/list-subject-type/list-subject-type.component';
import { AddCourseTypeComponent } from './components/course-type/add-course-type/add-course-type.component';
import { EditCourseTypeComponent } from './components/course-type/edit-course-type/edit-course-type.component';
import { ListCourseTypeComponent } from './components/course-type/list-course-type/list-course-type.component';
import { AddCourseSubTypeComponent } from './components/course-sub-type/add-course-sub-type/add-course-sub-type.component';
import { EditCourseSubTypeComponent } from './components/course-sub-type/edit-course-sub-type/edit-course-sub-type.component';
import { ListCourseSubTypeComponent } from './components/course-sub-type/list-course-sub-type/list-course-sub-type.component';
import { AddQuotaTypeComponent } from './components/quota-type/add-quota-type/add-quota-type.component';
import { EditQuotaTypeComponent } from './components/quota-type/edit-quota-type/edit-quota-type.component';
import { ListQuotaTypeComponent } from './components/quota-type/list-quota-type/list-quota-type.component';
import { AddPaperTypeComponent } from './components/paper-type/add-paper-type/add-paper-type.component';
import { EditPaperTypeComponent } from './components/paper-type/edit-paper-type/edit-paper-type.component';
import { ListPaperTypeComponent } from './components/paper-type/list-paper-type/list-paper-type.component';
import { AddOrganizationComponent } from './components/add-organization/add-organization.component';
import { AddFeesMastersComponent } from '../fees-management/super-admin/add-fees-masters/add-fees-masters.component';
import { EditFeesMastersComponent } from '../fees-management/super-admin/edit-fees-masters/edit-fees-masters.component';
import { ListFeesMastersComponent } from '../fees-management/super-admin/list-fees-masters/list-fees-masters.component';

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
      { path: 'add-module', component: AddModuleComponent },

      { path: '', component: AdminDashboardComponent },
      { path: 'add-org-category', component: AddOrgCategoryComponent },
      { path: 'add-fees-type', component: AddFeesTypeComponent },
      { path: 'add-accounts-head', component: AddAccountsHeadComponent },
      { path: 'add-package', component: AddPackageComponent },
      { path: 'add-stream', component: AddStreamComponent },
      { path: 'add-subject-attributes', component: AddSubjectAttributesComponent },
      //{ path: 'add-subject-type', component: AddSubjectTypeComponent },
      { path: 'add-course-type', component: AddCourseTypeComponent },
      { path: 'add-course-sub-type', component: AddCourseSubTypeComponent },
      { path: 'add-quota-type', component: AddQuotaTypeComponent },
      { path: 'add-paper-type', component: AddPaperTypeComponent },
      { path: 'add-organization', component: AddOrganizationComponent },
      // {
      //   path: 'add-fees-masters', component:AddFeesMastersComponent 
      //  },
       {path:'edit-fees-masters/:id',component:EditFeesMastersComponent},
       {path:'list-fees-masters',component:ListFeesMastersComponent}
    ],
  },

  { path: 'list-institute-type', component: ListInstituteTypeComponent },
  { path: 'list-module', component: ListModuleComponent },
  { path: 'edit-module/:module', component: EditModuleComponent },

  {
    path: 'edit-institute-type/:itemId/:instituteType',
    component: EditInstituteTypeComponent,
  },
  { path: 'add-associated-post', component: AddAssociatedPostComponent },
  {
    path: 'edit-associated-post/:id/:associated_post',
    component: EditAssociatedPostComponent,
  },
  { path: 'edit-org', component: EditOrganizationComponent },
  { path: 'edit-org-category/:itemId', component: EditOrgCategoryComponent },
  { path: 'edit-fees-type/:masterId', component: EditFeesTypeComponent },
  { path: 'edit-accounts-head/:itemId', component: EditAccountsHeadComponent },
  { path: 'edit-package/:masterId', component: EditPackageComponent },
  { path: 'edit-stream/:masterId', component: EditStreamComponent },
  { path: 'edit-subject-attributes/:masterId', component: EditSubjectAttributesComponent },
  // { path: 'edit-subject-type/:masterId', component: EditSubjectTypeComponent },
  { path: 'edit-course-type/:masterId', component: EditCourseTypeComponent },
  { path: 'edit-course-sub-type/:masterId', component: EditCourseSubTypeComponent },
  { path: 'edit-quota-type/:masterId', component: EditQuotaTypeComponent },
  { path: 'edit-paper-type/:masterId', component: EditPaperTypeComponent },
  { path: 'list-associated-post', component: ListAssociatedPostComponent },
  { path: 'list-org-category', component: ViewOrgCategoryComponent },
  { path: 'list-fees-type', component: ListFeesTypeComponent },
  { path: 'list-accounts-head', component: ListAccountsHeadComponent },
  { path: 'list-organization', component: ListOrganizationComponent },
  { path: 'list-packages', component: ListPackageComponent },
  { path: 'list-stream', component: ViewStreamComponent },
  { path: 'list-subject-attributes', component: ViewSubjectAttributesComponent },
  // { path: 'list-subject-type', component: ListSubjectTypeComponent },
  { path: 'list-course-type', component: ListCourseTypeComponent },
  { path: 'list-course-sub-type', component: ListCourseSubTypeComponent },
  { path: 'list-quota-type', component: ListQuotaTypeComponent },
  { path: 'list-paper-type', component: ListPaperTypeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationRoutingModule { }