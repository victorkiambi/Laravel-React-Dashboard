import React, {Component} from 'react'
import {Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

class Home extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
           <div className="container-fluid">
               <nav className="navbar navbar-expand-lg navbar navbar-dark bg-primary">
                   <a className="navbar-brand" href="#">Navbar</a>
                   <button className="navbar-toggler" type="button" data-toggle="collapse"
                           data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                           aria-expanded="false" aria-label="Toggle navigation">
                       <span className="navbar-toggler-icon"/>
                   </button>

                   <div className="collapse navbar-collapse" id="navbarSupportedContent">
                       <ul className="navbar-nav ml-auto">
                           <li className="nav-item ">
                               <Link to={'/login'} style={{color:"white"}}>Login</Link>
                           </li>
                           <li className="nav-item">
                               <Link to={'/register'} className="links" style={{color:"white", marginLeft:"10px"}}> Register</Link>
                           </li>

                       </ul>

                   </div>
               </nav>
           </div>

        );
    }

}
export default Home;
