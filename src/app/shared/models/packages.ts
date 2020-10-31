export class Packages {

    /** Partition Key for Masters Table NoSQL DynamoDB */
    master: string = 'PACKAGE';

    /** Short Key for Masters Table NoSQL DynamoDB */
    masterId?: string;

    /** hold the activation status of the Accounts Head */
    isActivated: boolean;

    /** flag for disable a data from view, User don't need so hidden instead of deleting */
    isDeleted: boolean;

    /** Attribute for Package Table */
    packageType : string;

   /** Attribute for Package Table */
    packageName : string;

   /** Attribute for Package Table */
    paymentPlan : string;

   /** Attribute for Package Table */
    packageDuration : string;

   /** Attribute for Package Table */
    packagePrice : string;

   /** Attribute for Package Table */
    packageDescription : string;

   /** Attribute for Package Table */
    isTrial : boolean;

   /** Attribute for Package Table */
    trialDuration : string;
}