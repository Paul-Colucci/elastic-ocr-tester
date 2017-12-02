import {IJob} from '../../models/IJob';

export interface IJobControlsProps {

    disabled: boolean;
    job: IJob;
    onAddFile: (jobId: string) => void;
    onDelete: (jobId: string) => void;
    onComplete: (jobId: string) => void;
}