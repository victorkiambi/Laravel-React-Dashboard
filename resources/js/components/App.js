import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Router, Route, BrowserRouter} from 'react-router-dom'
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";
import Protected from "./Protected";
import Logout from "./Auth/Logout/Logout";
import Admin from "../../layouts/Admin";

import "bootstrap/dist/css/bootstrap.min.css";
import "@/assets/css/animate.min.css";
import "@/assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "@/assets/css/demo.css";
import "@/assets/css/pe-icon-7-stroke.css";
import UserProfile from "../../views/UserProfile";
import TableList from "../../views/TableList";
import Typography from "../../views/Typography";
import Icons from "../../views/Icons";
import Maps from "../../views/Maps";
import Notifications from "../../views/Notifications";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isLoggedIn: '',
            token: '',
        })
    }
    componentDidMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({
                isLoggedIn: AppState.isLoggedIn,
                token: AppState.token });
        }
    }

    render() {
        return(
            <BrowserRouter >
                <div>
                    <Protected exact path="/" loggedIn={this.state.isLoggedIn}  component={Admin} />
                    <Protected  path="/admin/dashboard" loggedIn={this.state.isLoggedIn}  component={Admin} />
                    <Protected  path="/admin/user" loggedIn={this.state.isLoggedIn}  component={UserProfile} />
                    <Protected  path="/admin/table" loggedIn={this.state.isLoggedIn}  component={TableList} />
                    <Protected  path="/admin/icons" loggedIn={this.state.isLoggedIn}  component={Icons} />
                    <Protected  path="/admin/typography" loggedIn={this.state.isLoggedIn}  component={Typography} />
                    <Protected  path="/admin/maps" loggedIn={this.state.isLoggedIn}  component={Maps} />
                    <Protected  path="/admin/notifications" loggedIn={this.state.isLoggedIn}  component={Notifications} />

                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/logout" component={Logout} />

                </div>
            </BrowserRouter>
        )
    }
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
