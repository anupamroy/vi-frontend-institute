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
    ],
    imports: [CommonModule, OrganizationRoutingModule, FormsModule],
})
export class OrganizationModule {}
