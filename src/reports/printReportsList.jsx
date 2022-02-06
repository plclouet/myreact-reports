import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { retrieveReports, deleteReport, filterReports } from "./actions";
//import SearchBar from './searchBar';

import styles from "./printReportsList.module.css";

class PrintReportsList extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      isChecked: true,
      choiceDate: [],
      typeIRM:[]
    }

    this.getPrint = this.getPrint.bind(this);
    this.toggleChange = this.toggleChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeTypeIRM = this.handleChangeTypeIRM.bind(this);
  }

  //une fois chargé
  componentDidMount() {
    this.props.retrieveReports()
    .then(() => {
      console.log("componentDidMount props", this.props);
      console.log("componentdidmount",this.props.reports);
      const lastChoiceDate = localStorage.getItem("LAST_DATE");
      const lastChoiceTypeIRM = localStorage.getItem("LAST_TYPE_IRM");
      const sortedReports = this.props.reports.slice().sort((a, b) => b.rdvDate < a.rdvDate ? 1: -1);
      console.log("componentDidMount sortedReports", sortedReports);
      console.log("componentDidMount choicedate", this.state.choiceDate);
      if(!lastChoiceTypeIRM && !lastChoiceDate){

        this.setState({
          typeIRM: ['IRMosteo', 'IRMgene'],
          choiceDate: sortedReports[0].rdvDate.slice(0,10)
        }, () => {
       
          document.querySelector('#choiceDate').value = sortedReports[0].rdvDate.slice(0,10);
       
                })
      }else if(lastChoiceTypeIRM && !lastChoiceDate){
        this.setState({
          typeIRM: lastChoiceTypeIRM,
          choiceDate: sortedReports[0].rdvDate.slice(0,10)
        }, () => {
       
          document.querySelector('#choiceTypeIRM').value = lastChoiceTypeIRM;
       
                })
      }else{
        this.setState({
          typeIRM: ['IRMosteo', 'IRMgene'],
          choiceDate: lastChoiceDate
        }, () => {
       //on place le selecteur sur la première date
       document.querySelector('#choiceDate').value = lastChoiceDate;
       
                })

      };
    
    });
    
  } 

 //gestion du changement de type IRM
  handleChangeTypeIRM(e) {
   
    this.setState({ 
      typeIRM: e.target.value
     }, localStorage.setItem("LAST_TYPE_IRM",e.target.value))
  }

  //gestion du changement de date
  handleChange(e) {
   
    this.setState({ 
      choiceDate: e.target.value
     }, localStorage.setItem("LAST_DATE",e.target.value));
     console.log("LAST_DATE", localStorage.getItem("LAST_DATE"))
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
 

  window.print();
 
 // document.location.reload();
  window.history.back();
 
};
  

  render() {
    /* const { reports } = this.props;
    const sortedReports = reports.slice().sort((a, b) => b.rdvDate < a.rdvDate ? 1: -1); */

      //ajout
      const { reports } = this.props;
      const { choiceDate, typeIRM } = this.state;
      console.log("choiceDate", choiceDate);
      console.log("typeIRM", typeIRM);
      const sortedReports = reports.slice().sort((a, b) => b.rdvDate < a.rdvDate ? 1: -1);
      //uniqueArray: tableau uniquement des dates
      const arrayDates = sortedReports.map(sortedReport => sortedReport.rdvDate.slice(0,10));
      console.log("arrayDates", arrayDates);
      //sortedUniqueReports: tableau de dates sans doublon
      const sortedUniqueDates = [...new Set(arrayDates)];
      console.log("sortedUniqueDates", sortedUniqueDates);
      //on filtre les données
      const filterReports = sortedReports.filter(function (sortedReport) {
        
          return choiceDate.includes(sortedReport.rdvDate.slice(0,10)) 
          && typeIRM.includes(sortedReport.examen);
       
     
      });
      const examenIRMS=['IRMosteo', 'IRMgene'];
      console.log("choiceDate", choiceDate);
      console.log("sortedReports",sortedReports);
      console.log("filterReports",filterReports);


    return (
      <div className="container">
    
        <div className="col-md-12">
          <h4>Liste des protocoles</h4>
        {/*   <div className={styles.no_printable}>
          <SearchBar filterSearchReports={ this.filterSearchReports }/>
          </div> */}
          <div className="d-flex justify-content-around p-2">
             <select className="form-select text-center" name="choiceDate" id="choiceDate" 
             onChange={this.handleChange} 
             style={{width: "200px"}}>
               
               {sortedUniqueDates.map((sortedUniqueDate,index) => (
              <option key={index} value={sortedUniqueDate}>{sortedUniqueDate}</option>
               ))}
               <option value={sortedUniqueDates}>All</option>
              </select>
              <select className="form-select text-center" name="choiceTypeIRM" id="choiceTypeIRM" 
             onChange={this.handleChangeTypeIRM}  style={{width: "200px"}}>
               <option value={examenIRMS}>All</option>
                {examenIRMS.map((examenIRM,index) => (
              <option key={index} value={examenIRM}>{examenIRM}</option>
               ))}
               
              </select>
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
            
              {filterReports &&
                filterReports.map(
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
