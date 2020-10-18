import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './organization.component';
import { AddMastersComponent } from './components/add-masters/add-masters.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { InstituteTypeComponent } from './components/institute-type/institute-type/institute-type.component';
import { EditInstituteTypeComponent } from './components/institute-type/edit-institute-type/edit-institute-type.component';
import { ListInstituteTypeComponent } from './components/institute-type/list-institute-type/list-institute-type.component';
import { ViewMastersComponent } from './components/view-masters/view-masters.component';
import { EditMastersComponent } from './components/edit-masters/edit-masters.component';
import { FormsModule } from '@angular/forms';
import { AddAssociatedPostComponent } from './components/associated-post/add-associated-post/add-associated-post.component';
import { EditAssociatedPostComponent } from './components/associated-post/edit-associated-post/edit-associated-post.component';
import { ListAssociatedPostComponent } from './components/associated-post/list-associated-post/list-associated-post.component';
import { AddOrgCategoryComponent } from './components/org-category/add-org-category/add-org-category.component';
import { EditOrgCategoryComponent } from './components/org-category/edit-org-category/edit-org-category.component';
import { ViewOrgCategoryComponent } from './components/org-category/view-org-category/view-org-category.component';

@NgModule({
    declarations: [
        OrganizationComponent,
        AddMastersComponent,
        AdminDashboardComponent,
        InstituteTypeComponent,
        EditInstituteTypeComponent,
        ListInstituteTypeComponent,
        ViewMastersComponent,
        EditMastersComponent,
        AddAssociatedPostComponent,
        EditAssociatedPostComponent,
        ListAssociatedPostComponent,
        AddOrgCategoryComponent,
        EditOrgCategoryComponent,
        ViewOrgCategoryComponent
    ],
    imports: [CommonModule, OrganizationRoutingModule, FormsModule],
})
export class OrganizationModule {}
