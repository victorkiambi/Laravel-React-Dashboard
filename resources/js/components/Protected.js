import React, {Component} from "react";
import {Redirect, Route} from "react-router-dom";


const Protected = ({ component: Component, loggedIn, ...rest }) => {
    return (
        <Route {...rest} render={
            props => {
                return loggedIn ? <Component {...rest} {...props} /> : <Redirect to={{pathname: '/login', state: {from: props.location}}} />
            }
        }
         />
    )
}
export default Protected
