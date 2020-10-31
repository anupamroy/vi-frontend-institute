export class InstituteType{
    /** Partion Key for Master Table NoSQL DynamoDB */
    master: string = 'INSTITUTE_TYPE';

    /** Short Key for Masters Table NoSQL DynamoDB */
    masterId?: string;

    /** Attribute hold the institute_type_name */
    institute_type_name: string;

    /** hold the activation status of the Institute Type */
    isActivated: boolean;

    /** flag for disable a data from view, User don't need so hidden instead of deleting */
    isDeleted: boolean;
}