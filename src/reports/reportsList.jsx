import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { retrieveReports, deleteReport, filterReports } from "./actions";
//import SearchBar from './searchBar';

import Swal from 'sweetalert2';

//import styles from './reportsList.module.css';
import CardListReport from "./cardListReport";


class ReportsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      choiceDate: [],
      typeIRM:[]
    };

  this.handleChange = this.handleChange.bind(this);
  this.deleteSweetReport = this.deleteSweetReport.bind(this);
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
      }else if(lastChoiceTypeIRM && lastChoiceDate){
        this.setState({
          typeIRM: lastChoiceTypeIRM,
          choiceDate: lastChoiceDate
        }, () => {
       
          document.querySelector('#choiceTypeIRM').value = lastChoiceTypeIRM;
          document.querySelector('#choiceDate').value = lastChoiceDate;
       
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

 

//gestion du changement de date
  handleChange(e) {
   
    this.setState({ 
      choiceDate: e.target.value
     }, localStorage.setItem("LAST_DATE",e.target.value));
     console.log("LAST_DATE", localStorage.getItem("LAST_DATE"))
  }

  //gestion du changement de type IRM
  handleChangeTypeIRM(e) {
   
    this.setState({ 
      typeIRM: e.target.value
     }, localStorage.setItem("LAST_TYPE_IRM",e.target.value))
  }

  removeReport = (id) => {
    this.props.deleteReport(id).then(() => {
      this.props.retrieveReports();
    });
  };

  //pour la barre de recherche
  filterSearchReports = (query) => {
   this.props.filterReports(query).then((res) => {console.log(res)});
  }

//les fonctions pour sweetalert2

fireSweetAlert = (id) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      ).then(() => this.removeReport(id))
     // .then((response) => {
     //   axios.delete(`https://frozen-dawn-43758.herokuapp.com/upload/files/${ordonnance.imageOrdo.id}`)
      .then(() => {return <Redirect to="/" />;})
   } });
  }



  deleteSweetReport = (id) => {
    this.fireSweetAlert(id);
  };

  render() {

 

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
      <div className="container pb-5"> 
      <h4 className="py-3" align="center">Liste des comptes rendus</h4>
          
          <div className="d-flex flex-column">
          <div className="d-flex flex-wrap justify-content-around p-3">

         
            <Link to="/">
              <button className="btn btn-light m-2">Accueil</button>
            </Link>
            <Link to="/add-report">
              <button className="btn btn-light m-2">report+</button>
            </Link>
            <Link to="/print-report">
              <button className="btn btn-light m-2">Print</button>
            </Link>
            <Link to="/add-model">
              <button className="btn btn-light m-2">M+</button>
            </Link>
            <Link to="/list-models">
              <button className="btn btn-light m-2">M</button>
            </Link>
            <Link to="/add-protocole">
              <button className="btn btn-light m-2">P+</button>
            </Link>
            <Link to="/list-protocoles">
              <button className="btn btn-light m-2">P</button>
            </Link>
            <Link to="/timeline">
              <button className="btn btn-light m-2">Timeline</button>
            </Link>
            </div>
           {/*  <div className="py-2">
            <SearchBar filterSearchReports={ this.filterSearchReports }/>
            </div> */}
            <div className="d-flex justify-content-around p-3">
            <select className="form-select text-center" name="choiceDate" id="choiceDate" 
             onChange={this.handleChange} 
             style={{width: "200px"}}>
               
               {sortedUniqueDates.map((sortedUniqueDate,index) => (
              <option key={index} value={sortedUniqueDate}>{sortedUniqueDate}</option>
               ))}
               <option value={sortedUniqueDates}>All</option>
              </select>
              <button className="btn btn-secondary mx-3">{filterReports.length}</button>
              <select className="form-select text-center" name="choiceTypeIRM" id="choiceTypeIRM" 
             onChange={this.handleChangeTypeIRM}  style={{width: "200px"}}>
               <option value={examenIRMS}>All</option>
                {examenIRMS.map((examenIRM,index) => (
              <option key={index} value={examenIRM}>{examenIRM}</option>
               ))}
               
              </select>
          </div>
          </div>

        
          <div className="container">
         
             <div className="d-flex flex-wrap" style={{backgroundColor: '#0a3d62'}}> 
      
        {filterReports &&
                filterReports.map(filterReport => (
           <CardListReport key={filterReport.id} sortedReport={filterReport} deleteSweetReport={this.deleteSweetReport}/>
           
          ))}
      
           </div> 
        </div>
  
      </div>
        
    );
            
  }
}

const mapStateToProps = (state) => {
  return {
    reports: state.reports,
  };
};

export default connect(mapStateToProps, { retrieveReports, deleteReport, filterReports })(ReportsList);
