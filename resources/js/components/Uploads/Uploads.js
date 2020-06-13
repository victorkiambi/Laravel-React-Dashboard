import React, {Component} from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import Menu from "../Navigation/Menu/Menu";
import './Uploads.css'

class Uploads extends Component{
    constructor(props) {
        super(props);
        this.state = ({
            src: null,
            disabled: true,
            files: {},
            validated: false,
            buildingName: '',

        })

        this._openFileDialog = this._openFileDialog.bind(this);
        this.fileInputRef = React.createRef();
        this.onFilesAdded = this._onFilesAdded.bind(this);
        this.handleSubmit = this._handleSubmit.bind(this);
        this.handleInputChange = this._handleInputChange.bind(this);

    }

    _openFileDialog() {
        this.fileInputRef.current.click();
    }

    _onFilesAdded(e){
        const file = e.target.files;
    }

    _handleInputChange(event) {
        let name = event.target.value;
        if (!name){
            this.setState({
                disabled:true
            })
        }
        else {
            this.setState({
                buildingName: event.target.value,
                disabled: false
            })
        }

    }

    _handleSubmit(event) {
        console.log("clicked", this.state.buildingName);
        let tableName = this.state.buildingName;
        let state = localStorage["appState"];
        let AppState = JSON.parse(state);
        let token = AppState.token;

        axios.post('/api/table/'+tableName+'?token='+token, {
        } )
            .then(response => {
                console.log(response)
                this.setState({
                    buildingName: '',
                    disabled: true,
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        return (
           <Row >
               <Col md={12}>
                   <Menu/>
               </Col>
               <Col style={{marginTop:"10px", marginLeft:"5px"}} >
                   <div className="row">
                       <div className=" col-md-6 fileForm">
                           <div className="card" >
                               <div className="card-body">
                                   <Form noValidate validated={this.state.validated} >
                                       <label>Building Name</label>
                                       <input type="text"
                                              className="form-control"
                                              placeholder="Enter Building name"
                                              value={this.state.buildingName}
                                              required
                                              onChange={this.handleInputChange}
                                       />
                                   </Form>
                                   <br/>
                                   <Button variant="primary" type="button"
                                           onClick={this.handleSubmit}
                                           disabled={this.state.disabled}
                                   >
                                       Save
                                   </Button>
                               </div>
                           </div>
                       </div>
                       <div className="col-md-4">
                           <div className="DropZone  " style={{marginRight:"10px"}}
                                onClick={this._openFileDialog}
                                style={{ cursor: this.state.disabled ? "default" : "pointer" }}
                           >
                               <input ref={this.fileInputRef}
                                      className="FileInput"
                                      style={{display: "none"}}
                                      type="file"
                                      onChange={this.onFilesAdded}
                                      disabled={this.state.disabled}/>
                               <span>Upload Files</span>
                           </div>
                       </div>
                       </div>


               </Col>
           </Row>
        );
    }

}
export default Uploads
