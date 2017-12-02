import * as React from 'react';
import { Table } from 'react-bootstrap';
import { IJobListProps } from './IJobListProps';
import { IJobListState } from './IJobListState';
import FileAdder from '../fileAdder/FileAdder';
import ModalAlertDisplay from '../modalAlertDisplay/ModalAlertDisplay';
import JobFileDisplay from '../jobFileDisplay/JobFileDisplay';
import JobControls from '../jobControls/JobControls';
import DateDisplay from '../dateDisplay/DateDisplay';

export default class JobList extends React.Component<IJobListProps, IJobListState> {

    constructor(props: IJobListProps, state: IJobListState) {
        super(props);

        this.deleteJob = this.deleteJob.bind(this);
        this.completeJob = this.completeJob.bind(this);
        this.showAlert = this.showAlert.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
        this.showFileAdder = this.showFileAdder.bind(this);
        this.closeFileAdder = this.closeFileAdder.bind(this);

        this.state = {

            performingAction: false,
            showFileAdder: false,
            selectedJobId: '',
            showAlert: false,
            alertText: '',
            alertTitle: ''
        };
    }

    public render(): React.ReactElement<IJobListProps> {

        return (
            <div>

                <ModalAlertDisplay onClose={this.closeAlert} show={this.state.showAlert} title={this.state.alertTitle} alert={this.state.alertText} />

                <FileAdder dataProvider={this.props.dataProvider} jobId={this.state.selectedJobId} show={this.state.showFileAdder} onClose={this.closeFileAdder} />

                <Table responsive={true} striped={true} hover={true}>
                    <thead>
                        <tr>
                            <th>{'Id'}</th>
                            <th>{'Created'}</th>
                            <th>{'Status'}</th>
                            <th>{'FileName'}</th>
                            <th>{'Available'}</th>
                            <th>{'Download Expires'}</th>
                            <th>{'Completed'}</th>
                            {
                                this.props.allowActions && <th>{'Action'}</th>
                            }

                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.jobs.map((job, i) => (

                                <tr key={i}>
                                    <td>{job.Id}</td>
                                    <td><DateDisplay date={job.Created} /></td>
                                    <td>{job.Status}</td>
                                    <td><JobFileDisplay job={job} /></td>
                                    <td><DateDisplay date={job.Available} /></td>
                                    <td><DateDisplay date={job.DownloadExpires} /></td>
                                    <td><DateDisplay date={job.Completed} /></td>
                                    {
                                        this.props.allowActions &&
                                        <td>
                                            <JobControls
                                                job={job}
                                                disabled={this.state.performingAction}
                                                onAddFile={this.showFileAdder}
                                                onDelete={this.deleteJob}
                                                onComplete={this.completeJob}
                                            />
                                        </td>
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>

        );
    }

    private deleteJob(jobId: string): void {

        this.setState((prevState: IJobListState, props: IJobListProps): IJobListState => {

            prevState.performingAction = true;
            return prevState;
        });

        this.props.dataProvider.deleteJob(jobId)
            .then((result: boolean) => {

                this.setState((prevState: IJobListState, props: IJobListProps): IJobListState => {

                    prevState.performingAction = false;
                    return prevState;
                });

                this.props.onRefresh();
            }).catch((error: any) => {

                this.setState((prevState: IJobListState, props: IJobListProps): IJobListState => {

                    prevState.performingAction = false;
                    return prevState;
                });

                this.showAlert('Error Deleting Job', error.toString());
            });
    }

    private completeJob(jobId: string): void {

        this.setState((prevState: IJobListState, props: IJobListProps): IJobListState => {

            prevState.performingAction = true;
            return prevState;
        });

        this.props.dataProvider.completeJob(jobId)
            .then((result: boolean) => {

                this.setState((prevState: IJobListState, props: IJobListProps): IJobListState => {

                    prevState.performingAction = false;
                    return prevState;
                });

                this.props.onRefresh();
            }).catch((error: any) => {

                this.setState((prevState: IJobListState, props: IJobListProps): IJobListState => {

                    prevState.performingAction = false;
                    return prevState;
                });

                this.showAlert('Error Completing Job', error.toString());
            });
    }

    private showFileAdder(jobId: string): void {

        this.setState((prevState: IJobListState, props: IJobListProps): IJobListState => {

            prevState.showFileAdder = true;
            prevState.selectedJobId = jobId;
            return prevState;
        });
    }

    private closeFileAdder(): void {

        this.setState((prevState: IJobListState, props: IJobListProps): IJobListState => {

            prevState.showFileAdder = false;
            prevState.selectedJobId = '';
            return prevState;
        });

        this.props.onRefresh();
    }

    private showAlert(title: string, alert: string): void {

        this.setState((prevState: IJobListState, props: IJobListProps): IJobListState => {

            prevState.showAlert = true;
            prevState.alertText = alert;
            prevState.alertTitle = title;
            return prevState;
        });
    }

    private closeAlert(): void {

        this.setState((prevState: IJobListState, props: IJobListProps): IJobListState => {

            prevState.showAlert = false;
            return prevState;
        });
    }
}