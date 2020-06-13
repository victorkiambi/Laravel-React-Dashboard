import React, {Component} from 'react';
import {Button, Form, Grid, Row} from "react-bootstrap";

class Register extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Grid>
                <Row className="justify-content-md-center" style={{marginTop:"20px"}}>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Login</h5>
                            <Form>
                                <Form.Group controlId="formBasicName">
                                    <Form.Label> Name</Form.Label>
                                    <Form.Control type="name" placeholder="Enter Name" />

                                </Form.Group>

                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />

                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    </div>
                </Row>
            </Grid>
        );
    }

}
export default Register
