import * as React from 'react';
import {
    ButtonGroup,
    DropdownButton,
    MenuItem
} from 'react-bootstrap';
import { IJobControlsProps } from './IJobControlsProps';
import { IJobControlsState } from './IJobControlsState';

export default class JobManager extends React.Component<IJobControlsProps, IJobControlsState> {

    constructor(props: IJobControlsProps, state: IJobControlsState) {
        super(props);

        this.onAddFileClick = this.onAddFileClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onCompleteClick = this.onCompleteClick.bind(this);

        this.state = {

        };
    }

    public render(): React.ReactElement<IJobControlsProps> {

        return (

            <ButtonGroup>
                <DropdownButton id={'job_action_' + this.props.job.Id} title={'Action'} disabled={this.props.disabled}>

                    <MenuItem onClick={this.onAddFileClick}>
                        {'Add File'}
                    </MenuItem>

                    <MenuItem onClick={this.onDeleteClick}>
                        {'Delete'}
                    </MenuItem>

                    <MenuItem onClick={this.onCompleteClick}>
                        {'Complete'}
                    </MenuItem>
                </DropdownButton>
            </ButtonGroup>
        );
    }

    private onAddFileClick(): void {

        this.props.onAddFile(this.props.job.Id);
    }

    private onDeleteClick(): void {
        
        this.props.onDelete(this.props.job.Id);
    }

    private onCompleteClick(): void {
        
        this.props.onComplete(this.props.job.Id);
    }
}