export class Email {
    orgHash: string = "ORGANIZATION_EMAIL";
    orgKey?: string;
    email_text: string;
    email: string;
    email_type: string;
    email_availability_shift: string;
    associated_with: string;
    associated_with_org: string;
    isDeleted: boolean = false;
    isActivated: boolean = true;
}