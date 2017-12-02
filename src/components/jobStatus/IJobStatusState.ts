import { IJob } from '../../models/IJob';

export interface IJobStatusState {

    status: string;
    loading: boolean;
    error: string;
    jobs: IJob[];
}