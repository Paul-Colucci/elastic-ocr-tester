import * as React from 'react';
import { Table } from 'react-bootstrap';
import { ILicenseDisplayProps } from './ILicenseDisplayProps';
import { ILicenseDisplayState } from './ILicenseDisplayState';
import ErrorDisplay from '../errorDisplay/ErrorDisplay';
import LoadingDisplay from '../loadingDisplay/LoadingDisplay';
import { ILicenseInfo } from '../../models/ILicenseInfo';

export default class LicenseDisplay extends React.Component<ILicenseDisplayProps, ILicenseDisplayState> {

    constructor(props: ILicenseDisplayProps, state: ILicenseDisplayState) {
        super(props);

        this.state = {

            loading: true,
            error: '',
            licenseInfo: {

                EndPoint: {

                    BaseUrl: '',
                    AppId: '',
                    LicenseId: ''
                },
                Enabled: false,
                Region: '',
                Type: ''
            }
        };
    }

    public componentDidMount() {

        this.loadLicenseInfo();
    }

    public componentWillReceiveProps(nextProps: ILicenseDisplayProps) {

        this.loadLicenseInfo();
    }

    public render(): React.ReactElement<ILicenseDisplayProps> {

        return (
            <div>
                <LoadingDisplay loading={this.state.loading} />
                <ErrorDisplay error={this.state.error} />
                {
                    !this.state.loading && !this.state.error &&
                    <Table responsive={true} striped={true} hover={true}>
                        <thead />
                        <tbody>
                            <tr>

                                <td>
                                    <strong>{'License Id'}</strong>
                                </td>
                                <td>
                                    {this.state.licenseInfo.EndPoint.LicenseId}
                                </td>
                            </tr>
                            <tr>

                                <td>
                                    <strong>{'App Id'}</strong>
                                </td>
                                <td>
                                    {this.state.licenseInfo.EndPoint.AppId}
                                </td>
                            </tr>
                            <tr>

                                <td>
                                    <strong>{'Type'}</strong>
                                </td>
                                <td>
                                    {this.state.licenseInfo.Type}
                                </td>
                            </tr>
                            <tr>

                                <td>
                                    <strong>{'Region'}</strong>
                                </td>
                                <td>
                                    {this.state.licenseInfo.Region}
                                </td>
                            </tr>
                            <tr>

                                <td>
                                    <strong>{'Enabled'}</strong>
                                </td>
                                <td>
                                    {this.state.licenseInfo.Enabled.toString()}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                }
            </div>
        );
    }

    private loadLicenseInfo(): void {

        this.setState((prevState: ILicenseDisplayState, props: ILicenseDisplayProps): ILicenseDisplayState => {

            prevState.loading = true;
            prevState.error = '';
            return prevState;
        });

        this.props.dataProvider.getLicenseInfo()
            .then((result: ILicenseInfo) => {

                this.setState((prevState: ILicenseDisplayState, props: ILicenseDisplayProps): ILicenseDisplayState => {

                    prevState.loading = false;
                    prevState.error = '';
                    prevState.licenseInfo = result;
                    return prevState;
                });
            }).catch((error: any) => {

                this.setState((prevState: ILicenseDisplayState, props: ILicenseDisplayProps): ILicenseDisplayState => {

                    prevState.loading = false;
                    prevState.error = error.toString();
                    return prevState;
                });
            });
    }
}