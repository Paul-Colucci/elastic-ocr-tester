import * as React from 'react';
import {
    Modal,
    Button,
    Col,
    Form,
    FormGroup,
    FormControl,
    ControlLabel
} from 'react-bootstrap';
import { IJobCreatorProps } from './IJobCreatorProps';
import { IJobCreatorState } from './IJobCreatorState';
import ErrorDisplay from '../errorDisplay/ErrorDisplay';

export default class JobCreator extends React.Component<IJobCreatorProps, IJobCreatorState> {

    private metadata: string;
    private file: File;

    constructor(props: IJobCreatorProps, state: IJobCreatorState) {
        super(props);

        this.close = this.close.bind(this);
        this.onMetadataChange = this.onMetadataChange.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.add = this.add.bind(this);

        this.metadata = '';
        // this.file = new File([], '', undefined);

        this.state = {

            adding: false,
            error: '',
        };
    }

    public render(): React.ReactElement<IJobCreatorProps> {

        return (

            <Modal show={this.props.show} onHide={this.close}>
                <Modal.Header closeButton={true}>

                    <Modal.Title>{'Add Job'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form horizontal={true}>
                        <FormGroup>

                            <Col componentClass={ControlLabel} sm={2}>
                                {'Metadata'}
                            </Col>

                            <Col sm={10}>
                                <FormControl type="text" onChange={this.onMetadataChange} placeholder={'sorry, metadata support not added yet :*('} />
                            </Col>
                        </FormGroup>
                        <FormGroup>

                            <Col componentClass={ControlLabel} sm={2}>
                                {'File'}
                            </Col>

                            <Col sm={10}>
                                <FormControl type="file" onChange={this.onFileChange} />
                            </Col>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>

                    <Button bsStyle={'primary'} disabled={this.state.adding} onClick={this.add}>
                        {this.state.adding ? 'Adding...' : 'Add'}
                    </Button>

                    <Button bsStyle={'danger'} onClick={this.close}>
                        {'Close'}
                    </Button>
                    
                    <ErrorDisplay error={this.state.error} />
                </Modal.Footer>
            </Modal>
        );
    }

    private close(): void {

        this.props.onClose();
    }

    private onMetadataChange(event: React.FormEvent<FormControl>): void {

        var htmlInputElement = event.target as HTMLInputElement;
        this.metadata = htmlInputElement.value;
    }

    private onFileChange(event: React.FormEvent<FormControl>): void {

        var htmlInputElement = event.target as HTMLInputElement;

        if (htmlInputElement.files && htmlInputElement.files.length > 0) {

            this.file = htmlInputElement.files[0];
        } else {

            //note: may break IE; to do: find better way to assing file to null
            this.file = new File([], '', undefined);
        }
    }

    private add(): void {

        this.setState((prevState: IJobCreatorState, props: IJobCreatorProps): IJobCreatorState => {

            prevState.adding = true;
            prevState.error = '';
            return prevState;
        });

        this.props.dataProvider.addJob(this.file)
            .then((result: boolean) => {

                this.setState((prevState: IJobCreatorState, props: IJobCreatorProps): IJobCreatorState => {

                    prevState.adding = false;
                    prevState.error = '';
                    return prevState;
                });

                this.props.onClose();
            }).catch((error: any) => {

                this.setState((prevState: IJobCreatorState, props: IJobCreatorProps): IJobCreatorState => {

                    prevState.adding = false;
                    prevState.error = error.toString();
                    return prevState;
                });
            });
    }
}