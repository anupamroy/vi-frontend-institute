export class Phone{
    orgHash: string = "ORGANIZATION_PHONE";
    orgKey?: string;
    phone_number: string;
    phone_type: string;
    phone_timings: string;
    phone_availability_days: string;
    phone_availability_shift: string;
    associated_with: string;
    associated_with_org: string;
    isDeleted: boolean = false;
    isActivated: boolean = true;
}