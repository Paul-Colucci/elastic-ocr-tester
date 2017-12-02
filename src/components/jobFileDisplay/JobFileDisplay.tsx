import * as React from 'react';
import { IJobFileDisplayProps } from './IJobFileDisplayProps';
import { IJobFileDisplayState } from './IJobFileDisplayState';

export default class JobFileDisplay extends React.Component<IJobFileDisplayProps, IJobFileDisplayState> {

    constructor(props: IJobFileDisplayProps, state: IJobFileDisplayState) {
        super(props);

        this.state = {

        };
    }

    public render(): React.ReactElement<IJobFileDisplayProps> {

        return (
            this.props.job.DownloadUrl ?

                <a onClick={() => window.location.href = this.props.job.DownloadUrl}>
                    {this.props.job.Filename}
                </a> :

                <p>{this.props.job.Filename}</p>
        );
    }
}