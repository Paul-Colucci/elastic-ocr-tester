import * as React from 'react';
import {
    Modal,
    Button,
    Alert
} from 'react-bootstrap';
import { IModalAlertDisplayProps } from './IModalAlertDisplayProps';
import { IModalAlertDisplayState } from './IModalAlertDisplayState';

export default class ModalAlertDisplay extends React.Component<IModalAlertDisplayProps, IModalAlertDisplayState> {

    constructor(props: IModalAlertDisplayProps, state: IModalAlertDisplayState) {
        super(props);

        this.close = this.close.bind(this);

        this.state = {

        };
    }

    public render(): React.ReactElement<IModalAlertDisplayProps> {

        return (

            <Modal show={this.props.show} onHide={this.close}>
                <Modal.Header closeButton={true}>

                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Alert bsStyle={'danger'}>{this.props.alert}</Alert>
                </Modal.Body>
                <Modal.Footer>

                    <Button bsStyle={'danger'} onClick={this.close}>
                        {'Close'}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    private close(): void {

        this.props.onClose();
    }
}