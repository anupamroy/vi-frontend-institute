// const Joi = require('joi');

// const moduleSchema = Joi.object({
//     master: Joi.string()
//         .min(3)
//         .required(),
//     masterId: Joi.string(),
//     isActivated: Joi.boolean(),
//     isDeleted: Joi.boolean(),
//     parentModule: Joi.string(),
//     moduleName: Joi.string().require(),
//     connectedModules: Joi.string().require()
// });

export class Module {

    /** Partition Key for Masters Table NoSQL DynamoDB */
    master: string = 'MODULE';

    /** Short Key for Masters Table NoSQL DynamoDB */
    masterId?: string;

    /** hold the activation status of the Accounts Head */
    isActivated: boolean;

    /** flag for disable a data from view, User don't need so hidden instead of deleting */
    isDeleted: boolean;

    /** hold the activation status of the Accounts Head */
    parentModule: string;

    /** Attribute for Module Table */
    moduleName: string;

    /** Attribute for Module Table */
    connectedModules: string;
}
