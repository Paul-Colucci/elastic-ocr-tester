import * as React from 'react';
import {
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    Button
} from 'react-bootstrap';
import { IJobStatusProps } from './IJobStatusProps';
import { IJobStatusState } from './IJobStatusState';
import { IJob } from '../../models/IJob';
import ErrorDisplay from '../errorDisplay/ErrorDisplay';
import LoadingDisplay from '../loadingDisplay/LoadingDisplay';
import JobList from '../jobList/JobList';

export default class JobStatus extends React.Component<IJobStatusProps, IJobStatusState> {

    private status: string = '';

    constructor(props: IJobStatusProps, state: IJobStatusState) {
        super(props);

        this.loadJobs = this.loadJobs.bind(this);
        this.onStatusChange = this.onStatusChange.bind(this);

        this.state = {

            status: '',
            loading: true,
            error: '',
            jobs: [],
        };
    }

    public componentDidMount() {

        this.loadJobs();
    }

    public componentWillReceiveProps(nextProps: IJobStatusProps) {

        this.loadJobs();
    }

    public render(): React.ReactElement<IJobStatusProps> {

        return (
            <div>
                <Form inline={true} className={'status-form'}>
                    <FormGroup>

                        <ControlLabel>{'Status'}</ControlLabel>
                        <FormControl type={'text'} defaultValue={this.state.status} onChange={this.onStatusChange} />
                    </FormGroup>

                    <FormGroup>
                        <Button bsStyle={'primary'} onClick={this.loadJobs}>{'Search'}</Button>
                    </FormGroup>
                </Form>

                <LoadingDisplay loading={this.state.loading} />
                <ErrorDisplay error={this.state.error} />
                {
                    !this.state.loading && !this.state.error &&
                    <JobList
                        jobs={this.state.jobs}
                        dataProvider={this.props.dataProvider}
                        onRefresh={this.loadJobs}
                        allowActions={false}
                    />
                }
            </div>
        );
    }

    private onStatusChange(event: React.FormEvent<FormControl>) {

        var htmlInputElement = event.target as HTMLInputElement;
        this.status = htmlInputElement.value;
    }

    private loadJobs(): void {

        this.setState((prevState: IJobStatusState, props: IJobStatusProps): IJobStatusState => {

            prevState.status = this.status;
            prevState.loading = true;
            prevState.error = '';
            return prevState;
        });

        this.props.dataProvider.getJobsByStatus(this.status)
            .then((result: IJob[]) => {

                this.setState((prevState: IJobStatusState, props: IJobStatusProps): IJobStatusState => {

                    prevState.loading = false;
                    prevState.error = '';
                    prevState.jobs = result;
                    return prevState;
                });
            }).catch((error: any) => {

                this.setState((prevState: IJobStatusState, props: IJobStatusProps): IJobStatusState => {

                    prevState.loading = false;
                    prevState.error = error.toString();
                    return prevState;
                });
            });
    }
}