import { IEndpoint } from './IEndpoint';

export interface ILicenseInfo {

    EndPoint: IEndpoint;
    Type: string;
    Region: string;
    Enabled: boolean;
}