import { IElasticOcrTesterDataProvider } from '../../dataproviders/IElasticOcrTesterDataProvider'

export interface IFileAdderProps{

    jobId: string;
    show: boolean;
    dataProvider: IElasticOcrTesterDataProvider;   
    onClose: () => void;
}