import * as React from 'react';
import { PageHeader } from 'react-bootstrap';
import { IElasticOcrTesterProps } from './IElasticOcrTesterProps';
import { IElasticOcrTesterState } from './IElasticOcrTesterState';
import { IElasticOcrTesterDataProvider } from '../../dataproviders/IElasticOcrTesterDataProvider';
import { IEndpoint } from '../../models/IEndpoint';
import ElasticOcrDataProvider from '../../dataproviders/ElasticOcrDataProvider';
import EndpointManager from '../endpointManager/EndpointManager';
import ViewManager from '../viewManager/ViewManager';

export default class ElasticOcrTester extends React.Component<IElasticOcrTesterProps, IElasticOcrTesterState> {

    private dataProvider: IElasticOcrTesterDataProvider;

    constructor(props: IElasticOcrTesterProps, state: IElasticOcrTesterState) {
        super(props);

        this.changeView = this.changeView.bind(this);
        this.changeEndpoint = this.changeEndpoint.bind(this);

        var defaultEndpoint: IEndpoint = {

            BaseUrl: '',
            AppId: '',
            LicenseId: ''
        };

        this.dataProvider = new ElasticOcrDataProvider(defaultEndpoint);

        this.state = {

            view: 'jobs',
            endpoint: defaultEndpoint
        };
    }

    public render(): React.ReactElement<IElasticOcrTesterProps> {

        return (
            <div className={'elastic-ocr-tester'}>

                <PageHeader>{'Elastic OCR Tester'}</PageHeader>

                <EndpointManager endpoint={this.state.endpoint} onChangeEndpoint={this.changeEndpoint} />

                <ViewManager dataProvider={this.dataProvider} />
            </div>
        );
    }

    private changeView(view: string) {

        this.setState((prevState: IElasticOcrTesterState, props: IElasticOcrTesterProps): IElasticOcrTesterState => {

            prevState.view = view;
            return prevState;
        });
    }

    private changeEndpoint(endpoint: IEndpoint): void {

        this.dataProvider.endpoint = endpoint;

        this.setState((prevState: IElasticOcrTesterState, props: IElasticOcrTesterProps): IElasticOcrTesterState => {

            prevState.endpoint = endpoint;
            return prevState;
        });
    }
}