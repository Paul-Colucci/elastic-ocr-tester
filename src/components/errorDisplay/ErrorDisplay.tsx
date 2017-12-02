import * as React from 'react';
import { Alert } from 'react-bootstrap';
import { IErrorDisplayProps } from './IErrorDisplayProps';
import { IErrorDisplayState } from './IErrorDisplayState';

export default class ErrorDisplay extends React.Component<IErrorDisplayProps, IErrorDisplayState> {

    constructor(props: IErrorDisplayProps, state: IErrorDisplayState) {
        super(props);

        this.state = {

        };
    }

    public render(): React.ReactElement<IErrorDisplayProps> {

        return (
            <div>
                {
                    this.props.error &&
                    <Alert bsStyle={'danger'}>{this.props.error}</Alert>
                }
            </div>
        );
    }
}