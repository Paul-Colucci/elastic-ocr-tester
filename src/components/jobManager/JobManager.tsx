import * as React from 'react';
import { IJobManagerProps } from './IJobManagerProps';
import { IJobManagerState } from './IJobManagerState';
import { IJob } from '../../models/IJob';
import ErrorDisplay from '../errorDisplay/ErrorDisplay';
import LoadingDisplay from '../loadingDisplay/LoadingDisplay';
import JobList from '../jobList/JobList';
import JobManagerControls from '../jobManagerControls/JobManagerControls';
import JobCreator from '../jobCreator/JobCreator';

export default class JobManager extends React.Component<IJobManagerProps, IJobManagerState> {

    constructor(props: IJobManagerProps, state: IJobManagerState) {
        super(props);

        this.loadJobs = this.loadJobs.bind(this);
        this.openJobCreator = this.openJobCreator.bind(this);
        this.closeJobCreator = this.closeJobCreator.bind(this);

        this.state = {

            loading: true,
            error: '',
            jobs: [],
            showJobCreator: false,
        };
    }

    public componentDidMount() {

        this.loadJobs();
    }

    public componentWillReceiveProps(nextProps: IJobManagerProps) {

        this.loadJobs();
    }

    public render(): React.ReactElement<IJobManagerProps> {

        return (
            <div>
                <LoadingDisplay loading={this.state.loading} />
                <ErrorDisplay error={this.state.error} />
                {
                    !this.state.loading && !this.state.error &&
                    <div>

                        <JobCreator dataProvider={this.props.dataProvider} show={this.state.showJobCreator} onClose={this.closeJobCreator} />

                        <JobManagerControls onAddJob={this.openJobCreator} onRefreshJobs={this.loadJobs} />

                        <JobList 
                            jobs={this.state.jobs} 
                            dataProvider={this.props.dataProvider} 
                            onRefresh={this.loadJobs} 
                            allowActions={true}
                        />
                    </div>
                }
            </div>
        );
    }

    private loadJobs(): void {

        this.setState((prevState: IJobManagerState, props: IJobManagerProps): IJobManagerState => {

            prevState.loading = true;
            prevState.error = '';
            return prevState;
        });

        this.props.dataProvider.getJobs()
            .then((result: IJob[]) => {

                this.setState((prevState: IJobManagerState, props: IJobManagerProps): IJobManagerState => {

                    prevState.loading = false;
                    prevState.error = '';
                    prevState.jobs = result;
                    return prevState;
                });
            }).catch((error: any) => {

                this.setState((prevState: IJobManagerState, props: IJobManagerProps): IJobManagerState => {

                    prevState.loading = false;
                    prevState.error = error.toString();
                    return prevState;
                });
            });
    }

    private openJobCreator(): void {

        this.setState((prevState: IJobManagerState, props: IJobManagerProps): IJobManagerState => {

            prevState.showJobCreator = true;
            return prevState;
        });
    }

    private closeJobCreator(): void {

        this.setState((prevState: IJobManagerState, props: IJobManagerProps): IJobManagerState => {

            prevState.showJobCreator = false;
            return prevState;
        });

        this.loadJobs();
    }
}