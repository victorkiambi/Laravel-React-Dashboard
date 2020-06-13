import React, {Component} from 'react';
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, Grid, Row} from "react-bootstrap";
import {BrowserRouter,HashRouter, Switch, Route, Redirect} from "react-router-dom";
import Admin from "../../../../layouts/Admin";
import Dashboard from "../../../../views/Dashboard";
import UserProfile from "../../../../views/UserProfile";
import TableList from "../../../../views/TableList";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state =({
            validated: false,
            isLoggedIn: false,
            token: '',
            email:'',
            password:'',
            redirectToReferrer: false,
        })
        this.handleSubmit = this._handleSubmit.bind(this);
        this.handleEmailChange = this._handleEmailChange.bind(this);
        this.handlePasswordChange = this._handlePasswordChange.bind(this);

    }
    _handleEmailChange(e) {
        e.preventDefault();
        let email = e.target.value;
        if (!email)
            return
        this.setState({
            email: email
        })
    }
    _handlePasswordChange(e) {
        e.preventDefault();
        let password = e.target.value;
        if (!password)
            return
        this.setState({
            password:password
        })

    }

    _handleSubmit(e) {
        e.preventDefault();
        let values = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('api/user/login', values)
            .then(response=>{
                console.log("this token", response)
                let appState = {
                    isLoggedIn: true,
                    token: response.data.token
                };
                localStorage["appState"] = JSON.stringify(appState);
                this.setState({
                    isLoggedIn: appState.isLoggedIn,
                    token: appState.token,
                    redirectToReferrer: true
                });
            })
            .catch(error => {
                console.log(error)
            });
        this.setState({
            validated: true,

        })

    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirectToReferrer } = this.state

        if (redirectToReferrer === true) {
            // return <Redirect from="/" to="/admin/dashboard" />
            return (
            <BrowserRouter >
                <Switch>
                    <Route path="/admin" render={props => <Admin {...props} />} />
                    <Redirect from="/" to={from} />
                </Switch>
            </BrowserRouter>
            )
        }
        return (
           <Grid>
               <Row className="justify-content-md-center" style={{marginTop:"20px"}}>
                   <Col>
                       <div className="card" style={{width: '25rem'}}>
                           <div className="card-body">
                               <h5 className="card-title">Login</h5>

                               <form onSubmit={this.handleSubmit}>
                                   <FormGroup controlId="formBasictext"

                                   >
                                       <ControlLabel>Email address</ControlLabel>
                                       <FormControl type="email"
                                                    placeholder="Enter email"
                                                    name="email"
                                                    value={this.state.email}
                                                    onChange={this.handleEmailChange}
                                       />
                                   </FormGroup>

                                   <FormGroup controlId="formBasicPassword">
                                       <ControlLabel>Password</ControlLabel>
                                       <FormControl type="password"
                                                    name="password"
                                                    placeholder="Password"
                                                    value={this.state.password}
                                                    onChange={this.handlePasswordChange}

                                       />
                                   </FormGroup>
                                   <Button bsStyle="primary" type="submit">
                                       Submit
                                   </Button>
                               </form>
                           </div>
                       </div>
                   </Col>
               </Row>
           </Grid>
        );
    }

}
export default Login
