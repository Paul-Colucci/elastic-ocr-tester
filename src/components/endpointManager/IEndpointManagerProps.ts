import { IEndpoint } from '../../models/IEndpoint';

export interface IEndpointManagerProps {

    endpoint: IEndpoint;
    onChangeEndpoint: (endpoint: IEndpoint) => void;
}