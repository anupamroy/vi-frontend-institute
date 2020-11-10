export class CourseSubType{

    /** Partition Key for Couse Sub Type Masters Table NoSQL DynamoDB */
    master: string = 'COURSE_SUB_TYPE';

    /** Short Key for Couse Sub Type Masters Table NoSQL DynamoDB */
    masterId?: string;

    /** hold the activation status of the Couse Sub Type Head */
    isActivated: boolean;

    /** flag for disable a data from view, User don't need so hidden instead of deleting */
    isDeleted: boolean;

    /** Attribute for Couse Sub Type Head */
    courseSubType: string ;
}