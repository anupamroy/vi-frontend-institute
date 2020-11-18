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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddAssociatedPostComponent } from './components/associated-post/add-associated-post/add-associated-post.component';
import { EditAssociatedPostComponent } from './components/associated-post/edit-associated-post/edit-associated-post.component';
import { ListAssociatedPostComponent } from './components/associated-post/list-associated-post/list-associated-post.component';
import { AddOrgCategoryComponent } from './components/org-category/add-org-category/add-org-category.component';
import { EditOrgCategoryComponent } from './components/org-category/edit-org-category/edit-org-category.component';
import { ViewOrgCategoryComponent } from './components/org-category/view-org-category/view-org-category.component';
import { AddFeesTypeComponent } from './components/fees-type/add-fees-type/add-fees-type.component';
import { EditFeesTypeComponent } from './components/fees-type/edit-fees-type/edit-fees-type.component';
import { ListFeesTypeComponent } from './components/fees-type/list-fees-type/list-fees-type.component';
import { AddAccountsHeadComponent } from './components/accounts-head/add-accounts-head/add-accounts-head.component';
import { EditAccountsHeadComponent } from './components/accounts-head/edit-accounts-head/edit-accounts-head.component';
import { ListAccountsHeadComponent } from './components/accounts-head/list-accounts-head/list-accounts-head.component';
import { AddModuleComponent } from './components/module/add-module/add-module.component';
import { EditModuleComponent } from './components/module/edit-module/edit-module.component';
import { ListModuleComponent } from './components/module/list-module/list-module.component';
import { ListOrganizationComponent } from './components/list-organization/list-organization.component';
import { AddPackageComponent } from './components/packages-master/add-package/add-package.component';
import { EditPackageComponent } from './components/packages-master/edit-package/edit-package.component';
import { ListPackageComponent } from './components/packages-master/list-package/list-package.component';
import { EditOrganizationComponent } from './components/edit-organization/edit-organization.component';
import { AddStreamComponent } from './components/stream-master/add-stream/add-stream.component'
import { EditStreamComponent } from './components/stream-master/edit-stream/edit-stream.component';
import { ViewStreamComponent } from './components/stream-master/view-stream/view-stream.component';
import { AddSubjectAttributesComponent } from './components/subject-attributes-master/add-subject-attributes/add-subject-attributes.component';
import { EditSubjectAttributesComponent } from './components/subject-attributes-master/edit-subject-attributes/edit-subject-attributes.component';
import { ViewSubjectAttributesComponent } from './components/subject-attributes-master/view-subject-attributes/view-subject-attributes.component';
import { EditSubjectTypeComponent } from './components/subject-type/edit-subject-type/edit-subject-type.component';
import { AddSubjectTypeComponent } from './components/subject-type/add-subject-type/add-subject-type.component';
import { ListSubjectTypeComponent } from './components/subject-type/list-subject-type/list-subject-type.component';
import { AddCourseTypeComponent } from './components/course-type/add-course-type/add-course-type.component';
import { EditCourseTypeComponent } from './components/course-type/edit-course-type/edit-course-type.component';
import { ListCourseTypeComponent } from './components/course-type/list-course-type/list-course-type.component';
import { AddCourseSubTypeComponent } from './components/course-sub-type/add-course-sub-type/add-course-sub-type.component';
import { EditCourseSubTypeComponent } from './components/course-sub-type/edit-course-sub-type/edit-course-sub-type.component';
import { ListCourseSubTypeComponent } from './components/course-sub-type/list-course-sub-type/list-course-sub-type.component';
import { ListPaperTypeComponent } from './components/paper-type/list-paper-type/list-paper-type.component';
import { EditPaperTypeComponent } from './components/paper-type/edit-paper-type/edit-paper-type.component';
import { AddPaperTypeComponent } from './components/paper-type/add-paper-type/add-paper-type.component';
import { AddQuotaTypeComponent } from './components/quota-type/add-quota-type/add-quota-type.component';
import { EditQuotaTypeComponent } from './components/quota-type/edit-quota-type/edit-quota-type.component';
import { ListQuotaTypeComponent } from './components/quota-type/list-quota-type/list-quota-type.component';


// Angular material
import { A11yModule } from '@angular/cdk/a11y';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule, STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { OverlayModule } from '@angular/cdk/overlay';


import { AddOrganizationComponent } from './components/add-organization/add-organization.component';
import { BasicDetailsComponent } from './components/add-organization/basic-details/basic-details.component';
import { ContactDetailsComponent } from './components/add-organization/contact-details/contact-details.component';
import { AddressComponent } from './components/add-organization/common/address/address.component';
import { PhoneComponent } from './components/add-organization/common/phone/phone.component';
import { EmailComponent } from './components/add-organization/common/email/email.component';
import { SocialComponent } from './components/add-organization/common/social/social.component';
import { RegistrationComponent } from './components/add-organization/registration/registration.component';
import { DocumentComponent } from './components/add-organization/common/document/document.component';
import { SettingsComponent } from './components/add-organization/settings/settings.component';
import { MasterUserComponent } from './components/add-organization/master-user/master-user.component';
import { OrganizationTypeComponent } from './components/add-organization/organization-type/organization-type.component';
import { ErrorMessageComponent } from './components/add-organization/common/Validations/error-message/error-message.component';
import { PreviewComponent } from './components/add-organization/preview/preview.component';
import { PasswordStrengthComponent } from './components/add-organization/common/password-strength/password-strength.component';



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
        ViewOrgCategoryComponent,
        AddFeesTypeComponent,
        EditFeesTypeComponent,
        ListFeesTypeComponent,
        AddAccountsHeadComponent,
        EditAccountsHeadComponent,
        ListAccountsHeadComponent,
        AddModuleComponent,
        EditModuleComponent,
        ListModuleComponent,
        ListOrganizationComponent,
        AddPackageComponent,
        EditPackageComponent,
        ListPackageComponent,
        EditOrganizationComponent,
        AddStreamComponent,
        EditStreamComponent,
        ViewStreamComponent,
        AddSubjectAttributesComponent,
        EditSubjectAttributesComponent,
        ViewSubjectAttributesComponent,
        EditSubjectTypeComponent,
        AddSubjectTypeComponent,
        ListSubjectTypeComponent,
        AddCourseTypeComponent,
        EditCourseTypeComponent,
        ListCourseTypeComponent,
        AddCourseSubTypeComponent,
        EditCourseSubTypeComponent,
        ListCourseSubTypeComponent,
        ListPaperTypeComponent,
        EditPaperTypeComponent,
        AddPaperTypeComponent,
        AddQuotaTypeComponent,
        EditQuotaTypeComponent,
        ListQuotaTypeComponent,
        EditOrganizationComponent,
        AddOrganizationComponent,
        BasicDetailsComponent,
        ContactDetailsComponent,
        AddressComponent,
        PhoneComponent,
        EmailComponent,
        SocialComponent,
        RegistrationComponent,
        DocumentComponent,
        SettingsComponent,
        MasterUserComponent,
        OrganizationTypeComponent,
        ErrorMessageComponent,
        PreviewComponent,
        PasswordStrengthComponent,
    ],
    imports: [
        CommonModule, OrganizationRoutingModule, FormsModule, ReactiveFormsModule,
        A11yModule,
        ClipboardModule,
        CdkStepperModule,
        CdkTableModule,
        CdkTreeModule,
        DragDropModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,
        OverlayModule,
        PortalModule,
        ScrollingModule
    ],
    providers: [
        {
            provide: STEPPER_GLOBAL_OPTIONS,
            useValue: { showError: false }
        }
    ]
})
export class OrganizationModule {}
