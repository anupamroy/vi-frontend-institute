export class AddMaster{
    feesType : string;
    feesHead : string[];
    feesGroup : string;
    amount : number;
    accountsHead : string[];
    accademicYear : string;
    payable : string;
    payableBy : Date;
    isConcession : boolean;
    maxConcession : number;
    maxConcessionUnit :string;
    // concessionUnit : string;
    lateFine : boolean;
    lateFineCalculatedBy : string;
    lateFineAmount :number;
    lateFineUnit : string;
    maxLateFine : number;
    maxLateFineConcessionUnit : string;
    lateFineRevocable : boolean;
    maxLateFineRevocable: number;
	maxLateFineRevocableUnit: string;
	isActivated : boolean;
 	isDeleted : boolean;
}

export class Checkbox{
    isConcession : boolean = false;
    isLateFine : boolean = false;
    isLateFineRevocable : boolean = false;
}