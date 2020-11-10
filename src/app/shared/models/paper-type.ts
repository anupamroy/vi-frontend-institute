export class PaperType{

    /** Partition Key for Paper Type Masters Table NoSQL DynamoDB */
    master: string = 'PAPER_TYPE';

    /** Short Key for Paper Type Masters Table NoSQL DynamoDB */
    masterId?: string;

    /** hold the activation status of the Paper Type Head */
    is_active: boolean;

    /** flag for disable a data from view, User don't need so hidden instead of deleting */
    is_delete: boolean;

    /** Attribute for Paper Type Head */
    paper_type: string ;
}