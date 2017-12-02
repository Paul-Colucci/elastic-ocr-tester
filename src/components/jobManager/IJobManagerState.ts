import { IJob } from '../../models/IJob';

export interface IJobManagerState {

    loading: boolean;
    error: string;
    jobs: IJob[];
    showJobCreator: boolean;
}