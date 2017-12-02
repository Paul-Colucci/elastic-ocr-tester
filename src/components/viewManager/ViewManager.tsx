import * as React from 'react';
import {
    Tabs,
    Tab
} from 'react-bootstrap';
import { IViewManagerProps } from './IViewManagerProps';
import { IViewManagerState } from './IViewManagerState';
import LicenseDisplay from '../licenseDisplay/LicenseDisplay';
import JobManager from '../jobManager/JobManager';
import JobStatus from '../jobStatus/JobStatus';

export default class ViewManager extends React.Component<IViewManagerProps, IViewManagerState> {

    constructor(props: IViewManagerProps, state: IViewManagerState) {
        super(props);

        this.changeView = this.changeView.bind(this);

        this.state = {

            selectedView: 'jobs',
        };
    }

    public render(): React.ReactElement<IViewManagerProps> {

        return (
            <div className={'view-tabs'}>
                <Tabs id={'elastic-ocr-tester-tabs'} activeKey={this.state.selectedView} onSelect={this.changeView}>

                    <Tab eventKey={'license'} title={'License'} >
                        {
                            this.state.selectedView === 'license' &&
                            <LicenseDisplay dataProvider={this.props.dataProvider} />
                        }
                    </Tab>

                    <Tab eventKey={'jobs'} title={'Jobs'} >
                        {
                            this.state.selectedView === 'jobs' &&
                            <JobManager dataProvider={this.props.dataProvider} />
                        }
                    </Tab>

                    <Tab eventKey={'status'} title={'Status'} >
                        {
                            this.state.selectedView === 'status' &&
                            <JobStatus dataProvider={this.props.dataProvider} />                        }
                    </Tab>                    
                </Tabs>
            </div>
        );
    }

    private changeView(view: any) {

        this.setState((prevState: IViewManagerState, props: IViewManagerProps): IViewManagerState => {

            prevState.selectedView = view;
            return prevState;
        });
    }
}