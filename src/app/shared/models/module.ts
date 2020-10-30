export class Module{
    master: string = 'MODULE';
    masterId?: string;
    isActivated: boolean;
    isDeleted: boolean;
    parentModule: string;
    moduleName: string;
    connectedModules : string;
}
