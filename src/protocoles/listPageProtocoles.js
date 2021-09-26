import React, { Component } from "react";
import { connect } from "react-redux";
import SearchBarProtocoles from "./searchBarProtocoles";
import CardListPageProtocole from "./cardListPageProtocole";
import ProtocolesService from "./protocolesService";
import Swal from 'sweetalert2';
import { retrieveProtocoles, deleteProtocole } from "./actionsProtocole";
import { Redirect , Link } from "react-router-dom";
//import ReportsService from "./reportsService";

//import styles from "./showReport.module.css";

class ListPageProtocoles extends Component {
  constructor(props) {
    super(props);
  this.deleteSweetProtocole = this.deleteSweetProtocole.bind(this);
  }

 

  // State of your application
  state = {
    protocoles: [],
    error: null,
    redirect: false
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


  removeProtocole = (id) => {
    this.props.deleteProtocole(id).then(() => {
      this.props.retrieveProtocoles();
    });
  };

  

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
      ).then(() => {
        this.removeProtocole(id);})
        .then(this.setState(() => ({
          redirect: true
        })))
        
     
     
   } });
  }



  deleteSweetProtocole = (id) => {
    this.fireSweetAlert(id);
  };


  render() {
  /*   const { redirect, currentReport } = this.state;
    const str=currentReport.rdvDate;
    const goodDate = str.slice(0, 16);

     */
    const { error, protocoles, redirect } = this.state
  
  // Print errors if any
  if (error) {
    return <div>An error occured: {error.message}</div>
 }
 if (redirect) {
   return <Redirect to="/" />;
  
}

    return (
     
          <div className="container py-5">

            <div className="row">
            
            <h4>Liste des protocoles pour changement</h4>
            <Link to="/add-protocole">
              <button className="btn btn-light">Add a protocole</button>
            </Link>

            <div className="container"> 
               <SearchBarProtocoles updateSearchProtocoles={ this.updateSearchProtocoles }/>
              <div className="d-flex flex-wrap" style={{backgroundColor: '#0a3d62'}}>
                {/* {ordonnances.map(ordonnance => <li key={ordonnance.id}>{ordonnance.lastName} + {ordonnance.firstName}</li>)} */}
                {protocoles.sort((a, b) => b.protocoleTitre < a.protocoleTitre ? 1: -1).map(protocole => (
                  <CardListPageProtocole key={protocole.id} protocole={protocole} deleteSweetProtocole={this.deleteSweetProtocole}/>
                    //  console.log(ordonnance.imageOrdo.url)
                  ))}
       
              </div>
            </div>
      
       </div>
      </div>
      
    );
  }
}

/* const mapStateToProps = (state) => {
  return {
    protocoles: state.protocoles,
  };
}; */

//export default ListPageProtocoles;
export default connect(null, { retrieveProtocoles, deleteProtocole })(ListPageProtocoles);
