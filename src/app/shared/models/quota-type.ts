export class QuotaType{

    /** Partition Key for Quota Type Masters Table NoSQL DynamoDB */
    master: string = 'QUOTA';

    /** Short Key for Quota Type Masters Table NoSQL DynamoDB */
    masterId?: string;

    /** hold the activation status of the Quota Type Head */
    is_active: boolean;

    /** flag for disable a data from view, User don't need so hidden instead of deleting */
    is_delete : boolean;

    /** Attribute for Quota Type Head */
    quota : string ;
}