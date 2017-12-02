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
import { IFileAdderProps } from './IFileAdderProps';
import { IFileAdderState } from './IFileAdderState';
import ErrorDisplay from '../errorDisplay/ErrorDisplay';

export default class FileAdder extends React.Component<IFileAdderProps, IFileAdderState> {

    private file: File;

    constructor(props: IFileAdderProps, state: IFileAdderState) {
        super(props);

        this.add = this.add.bind(this);
        this.close = this.close.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        
        // this.file = new File([], '', undefined);

        this.state = {

            adding: false,
            error: '',
        };
    }

    public render(): React.ReactElement<IFileAdderProps> {

        return (

            <Modal show={this.props.show} onHide={this.close}>
                <Modal.Header closeButton={true}>

                    <Modal.Title>{'Add File To Job ' + this.props.jobId}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form horizontal={true}>
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
               
        this.setState((prevState: IFileAdderState, props: IFileAdderProps): IFileAdderState => {

            prevState.adding = true;
            prevState.error = '';
            return prevState;
        });

        try {
        
            this.props.dataProvider.addFile(this.props.jobId, this.file)
                .then((result: boolean) => {

                    this.setState((prevState: IFileAdderState, props: IFileAdderProps): IFileAdderState => {

                        prevState.adding = false;
                        prevState.error = '';
                        return prevState;
                    });

                    this.props.onClose();
                }).catch((error: any) => {

                    this.setState((prevState: IFileAdderState, props: IFileAdderProps): IFileAdderState => {

                        prevState.adding = false;
                        prevState.error = error.toString();
                        return prevState;
                    });
                });
        } catch (error) {

            this.setState((prevState: IFileAdderState, props: IFileAdderProps): IFileAdderState => {

                prevState.adding = false;
                prevState.error = error.toString();
                return prevState;
            });
        }
    }
}