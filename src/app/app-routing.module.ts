import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InstituteComponent } from './org-admin/institute/institute.component';
import { SellerDashboardComponent } from './org-admin/seller-dashboard/seller-dashboard.component';
import { SellerComponent } from './org-admin/seller/seller.component';
import { InstituteDashboardComponent } from './org-admin/institute-dashboard/institute-dashboard.component'
import { AddFeesMastersComponent } from './fees-management/super-admin/add-fees-masters/add-fees-masters.component';
import { ListFeesMastersComponent } from './fees-management/super-admin/list-fees-masters/list-fees-masters.component';
import { EditFeesMastersComponent } from './fees-management/super-admin/edit-fees-masters/edit-fees-masters.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'fees-management',
        loadChildren: () =>
            import('./fees-management/fees-management.module').then(
                (m) => m.FeesManagementModule
            ),
    },
    {
        path: 'org',
        loadChildren: () =>
            import('./organization/organization.module').then(
                (m) => m.OrganizationModule
            ),
    },
    {
        path: 'seller',
        component: SellerComponent,
    },
    {
        path: 'seller-dashboard',
        component: SellerDashboardComponent
    }

    ,
    {
        path: 'institute',
        component: InstituteComponent,
    },
    {
        path: 'institute-dashboard',
        component: InstituteDashboardComponent
    },
    {
        path: 'add-fees-masters', component:AddFeesMastersComponent
    },
    {
        path : 'list-fees-masters' , component : ListFeesMastersComponent
    },
    {
        path : 'edit-fees-masters/:feesKey' , component : EditFeesMastersComponent
    }

    // {
    //     path: 'seller',
    //     loadChildren: () =>
    //         import('./or').then(
    //             (m) => m.OrganizationModule
    //         ),
    // }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
