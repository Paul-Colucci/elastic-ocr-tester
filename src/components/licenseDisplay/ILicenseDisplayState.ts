import { ILicenseInfo } from '../../models/ILicenseInfo';

export interface ILicenseDisplayState {
    
    loading: boolean;
    error: string;
    licenseInfo: ILicenseInfo;
}