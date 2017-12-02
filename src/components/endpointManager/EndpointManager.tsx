import * as React from 'react';
import {
    Form,
    FormGroup,
    ControlLabel,
    FormControl
} from 'react-bootstrap';
import { IEndpointManagerProps } from './IEndpointManagerProps';
import { IEndpointManagerState } from './IEndpointManagerState';
import { IEndpoint } from '../../models/IEndpoint';

export default class EndpointManager extends React.Component<IEndpointManagerProps, IEndpointManagerState> {

    private endpoint: IEndpoint;

    constructor(props: IEndpointManagerProps, state: IEndpointManagerState) {
        super(props);

        this.onBaseUrlChange = this.onBaseUrlChange.bind(this);
        this.onLicsenseIdChange = this.onLicsenseIdChange.bind(this);
        this.onAppIdChange = this.onAppIdChange.bind(this);

        this.endpoint = this.props.endpoint;

        this.state = {

        };
    }

    public render(): React.ReactElement<IEndpointManagerProps> {

        return (
            <div>
                <Form inline={true} className={'endpoint-form'}>
                    <FormGroup>

                        <ControlLabel>{'Endpoint'}</ControlLabel>
                        <FormControl type={'text'} value={this.endpoint.BaseUrl} onChange={this.onBaseUrlChange} />
                    </FormGroup>
                    <FormGroup>

                        <ControlLabel>{'License Id'}</ControlLabel>
                        <FormControl type={'text'} value={this.endpoint.LicenseId} onChange={this.onLicsenseIdChange} />
                    </FormGroup>
                    <FormGroup>

                        <ControlLabel>{'App Id'}</ControlLabel>
                        <FormControl type={'text'} value={this.endpoint.AppId} onChange={this.onAppIdChange} />
                    </FormGroup>
                </Form>
            </div>
        );
    }

    private onBaseUrlChange(event: React.FormEvent<FormControl>) {

        var htmlInputElement = event.target as HTMLInputElement;
        this.endpoint.BaseUrl = htmlInputElement.value;

        this.props.onChangeEndpoint(this.endpoint);
    }

    private onLicsenseIdChange(event: React.FormEvent<FormControl>) {

        var htmlInputElement = event.target as HTMLInputElement;
        this.endpoint.LicenseId = htmlInputElement.value;

        this.props.onChangeEndpoint(this.endpoint);
    }

    private onAppIdChange(event: React.FormEvent<FormControl>) {

        var htmlInputElement = event.target as HTMLInputElement;
        this.endpoint.AppId = htmlInputElement.value;

        this.props.onChangeEndpoint(this.endpoint);
    }
}