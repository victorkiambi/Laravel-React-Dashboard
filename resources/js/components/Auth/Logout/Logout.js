import React, {Component} from "react";
import {Redirect} from "react-router-dom";

class Logout extends Component{
    constructor(props) {
        super(props);
        this.state = ({
            isLoggedIn: '',
            token: '',
        })

    }

    componentDidMount() {
        let appState = {
            isLoggedIn: false,
            token: '',
            };
        // save app state with user date in local storage
        localStorage["appState"] = JSON.stringify(appState);
        this.setState(
            {
                isLoggedIn: false,
                token: null,
            });

    }

    render() {

        if (this.state.isLoggedIn === false) {
            return <Redirect to='/login' />
        }
    }

}
export default Logout;
