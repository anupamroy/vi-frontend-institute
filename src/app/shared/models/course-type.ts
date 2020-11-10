export class CourseType{

    /** Partition Key for Course Type Masters Table NoSQL DynamoDB */
    master: string = 'COURSE_TYPE';

    /** Short Key for Course Type Masters Table NoSQL DynamoDB */
    masterId?: string;

    /** hold the activation status of the Course Type Head */
    isActivated: boolean;

    /** flag for disable a data from view, User don't need so hidden instead of deleting */
    isDeleted: boolean;

    /** Attribute for Course Type Head */
    courseType: string ;

    /** Attribute for Course Type Head */
    minDuration: string ;

    /** Attribute for Course Type Head */
    maxDuration: string ;

    /** Attribute for Course Type Head */
    durationUnit: string ;
}