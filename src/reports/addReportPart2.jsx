import React, { Component } from "react";
// import { connect } from "react-redux";
// import SearchBarProtocoles from "../protocoles/searchBarProtocoles";
// import { filterProtocoles } from "../protocoles/actionsProtocole";
import ListProtocoles from "../protocoles/listProtocoles";
import ListModels from "../models/listModels";
import CardProtocole from "../protocoles/cardProtocole";
import CardModel from "../models/cardModel";

class AddReportPart2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "React",
      showHideDemo1: false,
      showHideDemo2: false
     
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
    // console.log(this.props);
    const { showHideDemo1, showHideDemo2 } = this.state;
    const { autoSelectProtocoles, autoSelectModels } = this.props;
    // const sortedprotocoles = protocoles.slice(0,2).sort((a, b) => b.protocoleTitre < a.protocoleTitre ? 1: -1);
   
  
    
    return (
      <div>
        <div>
        <h2 align="center" className="mb-4">RECHERCHES</h2>
          <div className="container"> 
          <h4>Autoselect protocoles</h4>
          <div  style={{backgroundColor: '#0a3d62'}}>
               
                {autoSelectProtocoles && autoSelectProtocoles.slice(0,3).map(autoSelectProtocole => (
                  <CardProtocole key={autoSelectProtocole.id} protocole={autoSelectProtocole}/>
                 
                  ))}
       
          </div>
          <h4>Autoselect models</h4>  
          <div  style={{backgroundColor: '#0a3d62'}}>
               
                {autoSelectModels && autoSelectModels.slice(0,3).map(autoSelectModel => (
                  <CardModel key={autoSelectModel.id} model={autoSelectModel}/>
                 
                  ))}
       
          </div>
          </div>

        </div>
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