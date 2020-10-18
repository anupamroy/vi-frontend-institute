export interface FeesHeadProperties {
    feesHeadId: string;
    parentId: string;
    feesHeadname: string;
    instituteType: string;
}

export default class FeesHead {
    feesHeadId: string;
    parentId: string;
    feesHeadname: string;
    instituteType: string;

    constructor(params: FeesHeadProperties) {
        this.feesHeadId = params.feesHeadId;
        this.feesHeadname = params.feesHeadname;
        this.parentId = params.parentId;
        this.instituteType = params.instituteType;
    }
}
