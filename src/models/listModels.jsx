import React, { Component } from "react";
import { connect } from "react-redux";
import SearchBarModels from "./searchBarModels";
import CardModel from "./cardModel";
import { retrieveModels, filterModels } from "./actionsModel";
// import ModelsService from "./modelsService";
//import axios from 'axios';
//import { updateReport } from "./actions";
//import { Link } from "react-router-dom";

//import styles from "./showReport.module.css";

class ListModels extends Component {
  constructor(props) {
    super(props);
 
  this.filterSearchModels = this.filterSearchModels.bind(this);
  }

  // State of your application
  state = {

    error: null
  }

  componentDidMount() {
    this.props.retrieveModels();
  } 


 //pour la barre de recherche
filterSearchModels = (query) => {
  this.props.filterModels(query).then((res) => {console.log(res)});
 }



  render() {
  /*   const { redirect, currentReport } = this.state;
    const str=currentReport.rdvDate;
    const goodDate = str.slice(0, 16);

     */
    const { error } = this.state;
    const { models } = this.props;
    console.log(this.props);
    const sortedModels = models.slice().sort((a, b) => b.modelTitre < a.modelTitre ? 1: -1);
  
  // Print errors if any
  if (error) {
    return <div>An error occured: {error.message}</div>
 }

    return (
     
          <div className="container py-5">

            <div className="row">
            
            <h4>Liste des models</h4>

            <div className="container"> 
               <SearchBarModels filterSearchModels={this.filterSearchModels}/>
              <div className="col">
                {/* {ordonnances.map(ordonnance => <li key={ordonnance.id}>{ordonnance.lastName} + {ordonnance.firstName}</li>)} */}
                {sortedModels && sortedModels.map(sortedModel => (
                  <CardModel key={sortedModel.id} model={sortedModel}/>
                    //  console.log(ordonnance.imageOrdo.url)
                  ))}
       
              </div>
            </div>
        {/*     <div className="py-5"  id="copyArea">
                <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                </p>
            </div> */}
         {/*    <div className="row justify-content-around py-3">
            <div className="col-4" align="center">
            <button onClick={this.copyDivToClipboard} className="btn btn-outline-success">
                  Copy
            </button>
            </div>
            <div className="col-4" align="center">
            <Link to="/">
              <button className="btn btn-outline-secondary">Accueil</button>
            </Link>
            </div>
            
          </div> */}
       </div>
      </div>
      
    );
  }
}

const mapStateToProps = (state) => {
  return {
    models: state.models,
  };
}; 

export default connect(mapStateToProps, { retrieveModels, filterModels })(ListModels);
