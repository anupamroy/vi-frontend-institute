export class SubjectType{

    /** Partition Key for Subject Type Masters Table NoSQL DynamoDB */
    master: string = 'SUBJECT_TYPE';

    /** Short Key for Subject Type Masters Table NoSQL DynamoDB */
    masterId?: string;

    /** hold the activation status of the Accounts Head */
    isActivated: boolean;

    /** flag for disable a data from view, User don't need so hidden instead of deleting */
    isDeleted: boolean;

     /** Attribute for Accounts Head */
    subjectType: string ;
}