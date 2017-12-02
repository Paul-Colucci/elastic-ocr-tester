import { IElasticOcrTesterDataProvider } from '../../dataproviders/IElasticOcrTesterDataProvider'

export interface IJobCreatorProps{

    show: boolean;
    dataProvider: IElasticOcrTesterDataProvider;   
    onClose: () => void;
}