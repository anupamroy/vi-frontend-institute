import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';


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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
