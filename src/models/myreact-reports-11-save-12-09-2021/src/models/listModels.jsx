import React, { Component } from "react";
import SearchBarModels from "./searchBarModels";
import CardModel from "./cardModel";
import ModelsService from "./modelsService";
//import axios from 'axios';
//import { updateReport } from "./actions";
//import { Link } from "react-router-dom";

//import styles from "./showReport.module.css";

class ListModels extends Component {
 /*  constructor(props) {
    super(props);
   
   // this.saveReport = this.saveReport.bind(this);
    this.copyDivToClipboard = this.copyDivToClipboard.bind(this);

    
  }
 */

  // State of your application
  state = {
    models: [],
    error: null
  }

  // Fetch your restaurants immediately after the component is mounted
  componentDidMount = async () => {
    try {
      //const response = await axios.get(`http://localhost:1337/models`);
      const response = await ModelsService.getAll();
      this.setState({ models: response.data })
    } catch(error) {
      this.setState({ error })
    }
  }


  //pour la barre de recherche
  
  updateSearchModels = (prevModels) => {
    this.setState(() => ({
      models:prevModels,
    }));
  }

/*    componentDidMount() {
    this.getReport(window.location.pathname.replace("/show-report/", ""));
  } 


  saveReport() {
    this.props
      .updateReport(this.state.currentReport.id, this.state.currentReport)
      .then(this.setState(() => ({
        redirect: true
      })));
  } */

/*    copyDivToClipboard() {
    var range = document.createRange();
    range.selectNode(document.getElementById("copyArea"));
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges();// to deselect
} */

  render() {
  /*   const { redirect, currentReport } = this.state;
    const str=currentReport.rdvDate;
    const goodDate = str.slice(0, 16);

     */
    const { error, models } = this.state
  
  // Print errors if any
  if (error) {
    return <div>An error occured: {error.message}</div>
 }

    return (
     
          <div className="container py-5">

            <div className="row">
            
            <h4>Liste des models</h4>

            <div className="container"> 
               <SearchBarModels updateSearchModels={ this.updateSearchModels }/>
              <div className="col">
                {/* {ordonnances.map(ordonnance => <li key={ordonnance.id}>{ordonnance.lastName} + {ordonnance.firstName}</li>)} */}
                {models.map(model => (
                  <CardModel key={model.id} model={model}/>
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

export default ListModels;
