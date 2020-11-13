export class Address {
    orgHash: string = "ORGANIZATION_ADDRESS";
    orgKey?: string;
    address_for: string;
    address: string;
    country_name: string;
    zip_code: string;
    associated_with_org: string;
    isDeleted: boolean = false;
    isActivated: boolean = true;
}