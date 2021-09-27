import React, { Component } from "react";
import { connect } from "react-redux";
import SearchBarModels from "./searchBarModels";
import CardListPageModel from "./cardListPageModel";
//import ModelsService from "./modelsService";
import Swal from 'sweetalert2';
import { retrieveModels, deleteModel, filterModels } from "./actionsModel";
import { Redirect, Link } from "react-router-dom";
//import ReportsService from "./reportsService";

//import styles from "./showReport.module.css";

class ListPageModels extends Component {
  constructor(props) {
    super(props);
  this.deleteSweetModel = this.deleteSweetModel.bind(this);
  this.filterSearchModels = this.filterSearchModels.bind(this);
  }

  // State of your application
  state = {
    //models: [],
    error: null,
    redirect: false
  }


  componentDidMount() {
    this.props.retrieveModels();
   
  }
  // Fetch your restaurants immediately after the component is mounted
 /*  componentDidMount = async () => {
    try {
      //const response = await axios.get(`http://localhost:1337/protocoles`);
      const response = await ModelsService.getAll();
      this.setState({ models: response.data })
    } catch(error) {
      this.setState({ error })
    }
  } */

//pour la barre de recherche
filterSearchModels = (query) => {
  this.props.filterModels(query).then((res) => {console.log(res)});
 }


  //pour la barre de recherche
 /*  updateSearchModels = (prevModels) => {
    this.setState(() => ({
      models:prevModels,
    }));
  } */

  removeModel = (id) => {
    this.props.deleteModel(id).then(() => {
      this.props.retrieveModels();
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
      ).then(() => this.removeModel(id))
     // .then((response) => {
     //   axios.delete(`https://frozen-dawn-43758.herokuapp.com/upload/files/${ordonnance.imageOrdo.id}`)
      .then(this.setState(() => ({
        redirect: true
      })))
   } });
  }



  deleteSweetModel = (id) => {
    this.fireSweetAlert(id);
  };


  render() {
  /*   const { redirect, currentReport } = this.state;
    const str=currentReport.rdvDate;
    const goodDate = str.slice(0, 16);

     */
    const { error, redirect } = this.state;
    const { models } = this.props;
    const sortedmodels = models.slice().sort((a, b) => b.rdvDate < a.rdvDate ? 1: -1);
  
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
      
      <h4>Liste des models pour changement</h4>
      <div>
        <Link to="/add-model">
          <button className="btn btn-light m-2">Add a model</button>
        </Link>
      </div>
      
      <div className="container"> 
         <SearchBarModels filterSearchModels={ this.filterSearchModels }/>
        <div className="d-flex flex-wrap" style={{backgroundColor: '#0a3d62'}}>
          {/* {ordonnances.map(ordonnance => <li key={ordonnance.id}>{ordonnance.lastName} + {ordonnance.firstName}</li>)} */}
          {sortedmodels && sortedmodels.map(sortedmodel => (
            <CardListPageModel key={sortedmodel.id} model={sortedmodel} deleteSweetModel={this.deleteSweetModel}/>
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
    models: state.models,
  };
}; 

//export default ListPageModels;
export default connect(mapStateToProps, { retrieveModels, deleteModel, filterModels })(ListPageModels);
