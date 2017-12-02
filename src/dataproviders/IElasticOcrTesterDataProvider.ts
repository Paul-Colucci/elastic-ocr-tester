import { IEndpoint } from '../models/IEndpoint';
import { ILicenseInfo } from '../models/ILicenseInfo';
import { IJob } from '../models/IJob';

export interface IElasticOcrTesterDataProvider {

    endpoint : IEndpoint;
    getLicenseInfo(): Promise<ILicenseInfo>;
    getJobs(): Promise<IJob[]>;
    getJobsByStatus(status: string): Promise<IJob[]>;
    addJob(file: File): Promise<boolean>;
    addFile(jobId: string, file: File): Promise<boolean>;
    deleteJob(jobId: string): Promise<boolean>;
    completeJob(jobId: string): Promise<boolean>;
}