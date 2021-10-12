import React, { Component } from "react";
import { connect } from "react-redux";
import SearchBarProtocoles from "./searchBarProtocoles";
import CardProtocole from "./cardProtocole";
// import ProtocolesService from "./protocolesService";
import { retrieveProtocoles, filterProtocoles } from "./actionsProtocole";
//import axios from 'axios';
//import { updateReport } from "./actions";
//import { Link } from "react-router-dom";
//import ReportsService from "./reportsService";

//import styles from "./showReport.module.css";

class ListProtocoles extends Component {
  constructor(props) {
    super(props);
 
  this.filterSearchProtocoles = this.filterSearchProtocoles.bind(this);
  }

  // State of your application
  state = {
    error: null
  }

  componentDidMount() {
    this.props.retrieveProtocoles();
  } 


 //pour la barre de recherche
filterSearchProtocoles = (query) => {
  this.props.filterProtocoles(query).then((res) => {console.log(res)});
 }



  render() {
  /*   const { redirect, currentReport } = this.state;
    const str=currentReport.rdvDate;
    const goodDate = str.slice(0, 16);

     */
    const { error } = this.state;
    const { protocoles } = this.props;
    console.log(this.props);
    const sortedprotocoles = protocoles.slice().sort((a, b) => b.protocoleTitre < a.protocoleTitre ? 1: -1);
  
  // Print errors if any
  if (error) {
    return <div>An error occured: {error.message}</div>
 }

    return (
     
          <div className="container py-5">

            <div className="row">
            
            <h4>Liste des protocoles</h4>

            <div className="container"> 
               <SearchBarProtocoles filterSearchProtocoles={this.filterSearchProtocoles}/>
              <div className="col">
                {/* {ordonnances.map(ordonnance => <li key={ordonnance.id}>{ordonnance.lastName} + {ordonnance.firstName}</li>)} */}
                {sortedprotocoles && sortedprotocoles.map(sortedprotocole => (
                  <CardProtocole key={sortedprotocole.id} protocole={sortedprotocole}/>
                    //  console.log(ordonnance.imageOrdo.url)
                  ))}
       
              </div>
            </div>
      
       </div>
      </div>
      
    );
  }
}

const mapStateToProps = (state) => {
  return {
    protocoles: state.protocoles,
  };
}; 

export default connect(mapStateToProps, { retrieveProtocoles, filterProtocoles })(ListProtocoles);
