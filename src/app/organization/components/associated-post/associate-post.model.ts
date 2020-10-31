export class AssociatedPost {
    /** Partion Key for Master Table NoSQL DynamoDB */
    master: string = 'ASSOCIATED_POST';

    /** Short Key for Masters Table NoSQL DynamoDB */
    masterId?: string;

    /** hold the activation status of the Associate Post */
    isActivated: boolean;
    
    /** flag for disable a data from view, User don't need so hidden instead of deleting */
    isDeleted: boolean;

    /** Attribute hold the associated post name */
    associated_post_name: string;
}