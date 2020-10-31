export class AccountsHead {

    /** Partition Key for Masters Table NoSQL DynamoDB */
    master: string = 'ACCOUNTS_HEAD';

    /** Short Key for Masters Table NoSQL DynamoDB */
    masterId?: string;

    /** hold the activation status of the Accounts Head */
    isActivated: boolean;

    /** flag for disable a data from view, User don't need so hidden instead of deleting */
    isDeleted: boolean;

    /** Attribute hold the account head name */
    accountsHead: string;

    /** Attribute hold the parent accounts head */
    parentAccountsHead: string;
}