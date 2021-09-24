import React, { Component } from "react";
import SearchBarProtocoles from "./searchBarProtocoles";
import CardProtocole from "./cardProtocole";
import ProtocolesService from "./protocolesService";
//import axios from 'axios';
//import { updateReport } from "./actions";
//import { Link } from "react-router-dom";
//import ReportsService from "./reportsService";

//import styles from "./showReport.module.css";

class ListProtocoles extends Component {
/*   constructor(props) {
    super(props);
   
   // this.saveReport = this.saveReport.bind(this);
  //  this.copyDivToClipboard = this.copyDivToClipboard.bind(this);

    
  }
 */

  // State of your application
  state = {
    protocoles: [],
    error: null
  }

  // Fetch your restaurants immediately after the component is mounted
  componentDidMount = async () => {
    try {
      //const response = await axios.get(`http://localhost:1337/protocoles`);
      const response = await ProtocolesService.getAll();
      this.setState({ protocoles: response.data })
    } catch(error) {
      this.setState({ error })
    }
  }


  //pour la barre de recherche
  
  updateSearchProtocoles = (prevProtocoles) => {
    this.setState(() => ({
      protocoles:prevProtocoles,
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
    const { error, protocoles } = this.state
  
  // Print errors if any
  if (error) {
    return <div>An error occured: {error.message}</div>
 }

    return (
     
          <div className="container py-5">

            <div className="row">
            
            <h4>Liste des protocoles</h4>

            <div className="container"> 
               <SearchBarProtocoles updateSearchProtocoles={ this.updateSearchProtocoles }/>
              <div className="col">
                {/* {ordonnances.map(ordonnance => <li key={ordonnance.id}>{ordonnance.lastName} + {ordonnance.firstName}</li>)} */}
                {protocoles.sort((a, b) => b.protocoleTitre < a.protocoleTitre ? 1: -1).map(protocole => (
                  <CardProtocole key={protocole.id} protocole={protocole}/>
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

export default ListProtocoles;
