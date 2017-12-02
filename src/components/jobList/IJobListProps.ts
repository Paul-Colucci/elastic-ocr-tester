import { IElasticOcrTesterDataProvider } from '../../dataproviders/IElasticOcrTesterDataProvider'
import { IJob } from '../../models/IJob';

export interface IJobListProps {

    dataProvider: IElasticOcrTesterDataProvider;
    jobs: IJob[];
    onRefresh: () => void;
    allowActions: boolean;
};