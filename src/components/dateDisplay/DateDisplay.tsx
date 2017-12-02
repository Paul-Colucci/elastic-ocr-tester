import * as React from 'react';
import * as moment from 'moment';
import { IDateDisplayProps } from './IDateDisplayProps';
import { IDateDisplayState } from './IDateDisplayState';

export default class DateDisplay extends React.Component<IDateDisplayProps, IDateDisplayState> {

    constructor(props: IDateDisplayProps, state: IDateDisplayState) {
        super(props);

        this.state = {

        };
    }


    public render(): React.ReactElement<IDateDisplayProps> {

        return (
            <p>
                {this.props.date && moment(this.props.date).format('MM/DD/YYYY hh:mm:ss a')}
            </p>
        );
    }
}