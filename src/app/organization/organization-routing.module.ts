import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMastersComponent } from './components/add-masters/add-masters.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AddAssociatedPostComponent } from './components/associated-post/add-associated-post/add-associated-post.component';
import { EditAssociatedPostComponent } from './components/associated-post/edit-associated-post/edit-associated-post.component';
import { ListAssociatedPostComponent } from './components/associated-post/list-associated-post/list-associated-post.component';
import { EditInstituteTypeComponent } from './components/institute-type/edit-institute-type/edit-institute-type.component';
import { InstituteTypeComponent } from './components/institute-type/institute-type/institute-type.component';
import { ListInstituteTypeComponent } from './components/institute-type/list-institute-type/list-institute-type.component';
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
            { path: 'add-institute-type', component: InstituteTypeComponent },
            { path: '', component: AdminDashboardComponent },
        ],
    },

    { path: 'list-institute-type', component: ListInstituteTypeComponent },
    { path: 'edit-institute-type/:itemId/:instituteType', component: EditInstituteTypeComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrganizationRoutingModule {}
