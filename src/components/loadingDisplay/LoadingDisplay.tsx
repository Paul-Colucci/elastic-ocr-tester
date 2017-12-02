import * as React from 'react';
import { Image } from 'react-bootstrap';
import { ILoadingDisplayProps } from './ILoadingDisplayProps';
import { ILoadingDisplayState } from './ILoadingDisplayState';
const loader = require('../../assets/ajax-loader.gif');

export default class LoadingDisplay extends React.Component<ILoadingDisplayProps, ILoadingDisplayState> {

    constructor(props: ILoadingDisplayProps, state: ILoadingDisplayState) {
        super(props);

        this.state = {

        };
    }

    public render(): React.ReactElement<ILoadingDisplayProps> {

        return (
            <div>
                {
                    this.props.loading &&
                    <Image src={loader} responsive={true} width={50} />
                }
            </div>
        );
    }
}