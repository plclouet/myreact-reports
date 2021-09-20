import React, { Component } from "react";

import ListProtocoles from "../protocoles/listProtocoles";
import ListModels from "../models/listModels";


class AddReportPart2 extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      showHideDemo1: false,
      showHideDemo2: false,
  
    };
    this.hideComponent = this.hideComponent.bind(this);
  }

  hideComponent(name) {
    console.log(name);
    switch (name) {
      case "showHideDemo1":
        this.setState({ showHideDemo1: !this.state.showHideDemo1 });
        break;
      case "showHideDemo2":
        this.setState({ showHideDemo2: !this.state.showHideDemo2 });
        break;
      default:
 
    }
  }

  render() {
    const { showHideDemo1, showHideDemo2 } = this.state;
    return (
      <div>
        <div className="row justify-content-around py-3">
            <div className="col-6" align="center">
                <button className="btn btn-light" onClick={() => this.hideComponent("showHideDemo1")}>
                   Protocoles
                 </button>
            </div>
            <div className="col-6" align="center">
                <button className="btn btn-light" onClick={() => this.hideComponent("showHideDemo2")}>
                   Models
                </button>
            </div>
         
         
        </div>
        {showHideDemo1 && <ListProtocoles />}
    
        {showHideDemo2 && <ListModels />}
      
    
        
      </div>
    );
  }
}

export default AddReportPart2;