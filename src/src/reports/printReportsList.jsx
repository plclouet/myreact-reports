import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { retrieveReports, deleteReport, filterReports } from "./actions";
import SearchBar from './searchBar';

import styles from "./printReportsList.module.css";

class PrintReportsList extends Component {
  constructor(props) {
    super(props);
    this.getPrint = this.getPrint.bind(this);
    this.toggleChange = this.toggleChange.bind(this);
    this.state = {
      isChecked: true,
     // reports: this.props.reports,
    }
  }
  componentDidMount() {
    this.props.retrieveReports();
  }

//pour la barre de recherche
filterSearchReports = (query) => {
  this.props.filterReports(query).then((res) => {console.log(res)});
 }

//modifier le check
toggleChange = () => {
  this.setState({
    isChecked: !this.state.isChecked,
  });
}

  
// fonction pour imprimer
getPrint = () => {
  //on sélectionne la table
  const grid = document.getElementById("printTable");

  //on sélectionne les checkboxes dans la table
  const checkBoxes = grid.getElementsByTagName("input");
  var message = "liste des protocoles:\n";

  //loop sur les checkboxes
  for (var i=0; i<checkBoxes.length; i++){
    if (checkBoxes[i].checked){
    
      const row = checkBoxes[i].parentNode.parentNode;
      console.log(row);
      
      
      message += row.cells[0].innerHTML;
      message += " ";
      message += row.cells[1].innerHTML;
      message += " ";
      message += row.cells[2].innerHTML;
      message += " Protocole: ";
      message += row.cells[3].innerHTML;
      message += "\n";
    } else {
       const row = checkBoxes[i].parentNode.parentNode;
      //row.classList.add("noPrint");
      row.hidden = true;
      //row.classList.add("no_printable");
      console.log(row);
    }
      
    
  }
  console.log(message);
  // on affiche le message
  //alert(message);
 /*   const newWin = window.open("");
  newWin.document.write(message);
  newWin.print();
  newWin.close();  */
 
  window.print();
 
 // document.location.reload();
  window.history.back();
 
};
  

  render() {
    const { reports } = this.props;
    const sortedReports = reports.slice().sort((a, b) => b.rdvDate < a.rdvDate ? 1: -1);

    return (
      <div className="container">
      {/* <div className="list row"> */}
        <div className="col-md-6">
          <h4>Liste des protocoles</h4>
          <div className={styles.no_printable}>
          <SearchBar filterSearchReports={ this.filterSearchReports }/>
          </div>
          
          <div className={styles.no_printable}>
            <Link to="/">
              <button className="btn btn-light">Accueil</button>
            </Link>
            <button id="print" type="button" onClick={this.getPrint} className="btn btn-light">Print</button>

          </div>
          {/* <table className="u-full-width"> 
              style={{display: this.state.isChecked ? 'null' : 'none'}}
          */}
          <table id="printTable" className={`${styles.exemple} table table-sm table-hover`}>
          
            <thead>
              <tr>
                <th className={styles.th_big}>rdv</th>
                <th className={styles.th_big}>Nom</th>
                <th className={styles.th_medium}>Prenom</th>
                <th className={styles.th_big}>Examen</th>
                <th className={styles.th_vbig}>Protocole</th>
                <th className={styles.no_printable}>Select</th>
              
              </tr>
            </thead>
            <tbody>
            
              {sortedReports &&
                sortedReports.map(
                  ({ rdvDate, nom, prenom, titre, protocole }, i) => (
                    <tr key={i} >
                      <td>{rdvDate.slice(0,16)}</td>
                      <td>{nom}</td>
                      <td>{prenom}</td>
                      <td>{titre}</td>
                      <td>{protocole}</td>
                      <td className={styles.no_printable}><input type="checkbox" id="myCheck" defaultChecked={this.state.isChecked}
                      onChange={this.toggleChange} /></td>
                     
                    </tr>
                  )
                )}
            </tbody>
          </table>
        </div>
      </div>
      // </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reports: state.reports,
  };
};

export default connect(mapStateToProps, { retrieveReports, deleteReport, filterReports })(PrintReportsList);