import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { retrieveReports, deleteReport } from "./actions";
import SearchBar from './searchBar';

import Swal from 'sweetalert2';

import styles from './reportsList.module.css';


class ReportsList extends Component {
 
  state = {
    reports: this.props.reports,

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
  
  updateSearchReports = (prevReports) => {
    this.setState(() => ({
      reports:prevReports,
    }));
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
    const { reports } = this.state;

    	
const sortedReports = reports.slice().sort((a, b) => b.rdvDate < a.rdvDate ? 1: -1);
    console.log(sortedReports);

    
    return (
      <div className="container list row">
        
        <div className="col-md-12 table-responsive-sm">
          <h4 className="py-3" align="center">Liste des comptes rendus</h4>
          
          <div>
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
          <SearchBar updateSearchReports={ this.updateSearchReports }/>
          </div>
          </div>
          
          {/* <table className="u-full-width"> */}
          {/* <table className={styles.exemple}> */}
          <table className={`${styles.exemple} table table-sm table-striped table-hover`}>
          {/* <table className="table table-sm table-striped table-hover"> */}
            <thead>
              <tr>
                <th className={styles.col_small}>Nom</th>
                <th className={styles.col_hide}>Prenom</th>
                <th className={styles.col_small}>Titre</th>
                <th className={`${styles.th_small} ${styles.col_hide}`} >Examen</th>
                <th className={`${styles.th_moy} ${styles.col_hide}`}>Date</th>
                <th className={styles.col_hide}>Indication</th>
                <th className={styles.col_hide}>Protocole</th>
                <th className={styles.col_hide}>Contenu</th>
                <th className={`${styles.th_big} ${styles.col_hide}`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedReports &&
                sortedReports.map(
                  ({ id, nom, prenom, titre, examen, rdvDate, indication, protocole, contenu }, i) => (
                    <tr key={i}>
                      <td className={styles.box}>{nom}</td>
                      <td className={`${styles.box} ${styles.col_hide}`}>{prenom}</td>
                      <td className={styles.box}>{titre}</td>
                      <td className={`${styles.box} ${styles.col_hide}`}>{examen}</td>
                      <td className={`${styles.box} ${styles.col_hide}`}>{rdvDate}</td>
                      <td className={`${styles.box} ${styles.col_hide}`}>{indication}</td>
                      <td className={`${styles.box} ${styles.col_hide}`}>{protocole}</td>
                      <td className={`${styles.box} ${styles.col_hide}`}>{contenu}</td>
                      <td className={`${styles.box} ${styles.col_hide}`}>
                        <div align="center">
                        <button className="btn btn-danger btn-sm mx-1" onClick={() =>{this.deleteSweetReport(id)}}>
                          Delete
                        </button>
                        <Link to={`/edit-report/${id}`}>
                          <button className="btn btn-primary btn-sm mx-1">Edit</button>
                        </Link>
                        <Link to={`/show-report/${id}`}>
                          <button className="btn btn-secondary btn-sm">Show</button>
                        </Link>
                        </div>
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
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

export default connect(mapStateToProps, { retrieveReports, deleteReport })(ReportsList);
