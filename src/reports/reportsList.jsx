import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { retrieveReports, deleteReport, filterReports } from "./actions";
import SearchBar from './searchBar';

import Swal from 'sweetalert2';

//import styles from './reportsList.module.css';
import CardListReport from "./cardListReport";


class ReportsList extends Component {
  constructor(props) {
    super(props);
  this.deleteSweetReport = this.deleteSweetReport.bind(this);
  }
  componentDidMount() {
    this.props.retrieveReports();
   
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

    console.log("pros retrieveReports");
    console.log(this.props.reports);
      console.log("state");
    console.log(this.state);

   
    const { reports } = this.props;
    const sortedReports = reports.slice().sort((a, b) => b.rdvDate < a.rdvDate ? 1: -1);

    return (
      <div className="container"> 
      <h4 className="py-3" align="center">Liste des comptes rendus</h4>
          
          <div>
            <Link to="/">
              <button className="btn btn-light">Accueil</button>
            </Link>
            <Link to="/add-report">
              <button className="btn btn-light">Add a report</button>
            </Link>
            <Link to="/print-report">
              <button className="btn btn-light">Print list of reports</button>
            </Link>
            <Link to="/add-model">
              <button className="btn btn-light">Add a model</button>
            </Link>
            <Link to="/add-protocole">
              <button className="btn btn-light">Add a protocole</button>
            </Link>
            <div className="py-2">
            <SearchBar filterSearchReports={ this.filterSearchReports }/>
            </div>
          </div>

        
          <div className="container">
         
             <div className="d-flex flex-wrap"> 
      
        {sortedReports &&
                sortedReports.map(sortedReport => (
           <CardListReport key={sortedReport.id} sortedReport={sortedReport} deleteSweetReport={this.deleteSweetReport}/>
           
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
