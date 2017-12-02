import * as React from 'react';
import {
    Button,
    ButtonToolbar
} from 'react-bootstrap';
import { IJobManagerControlsProps } from './IJobManagerControlsProps';
import { IJobManagerControlsState } from './IJobManagerControlsState';

export default class JobManagerControls extends React.Component<IJobManagerControlsProps, IJobManagerControlsState> {

    constructor(props: IJobManagerControlsProps, state: IJobManagerControlsState) {
        super(props);

        this.onRefreshJobsClick = this.onRefreshJobsClick.bind(this);
        this.onAddJobClick = this.onAddJobClick.bind(this);

        this.state = {

        };
    }

    public render(): React.ReactElement<IJobManagerControlsProps> {

        return (
            <ButtonToolbar>

                <Button bsStyle={'primary'} onClick={this.onAddJobClick}>{'Add'}</Button>

                <Button bsStyle={'info'} onClick={this.onRefreshJobsClick}>{'Refresh'}</Button>
            </ButtonToolbar>
        );
    }

    private onAddJobClick(): void {

        this.props.onAddJob();
    }

    private onRefreshJobsClick(): void {

        this.props.onRefreshJobs();
    }
}