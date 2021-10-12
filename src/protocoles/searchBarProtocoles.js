import React, { Component } from 'react';
import { Formik } from 'formik';
//import axios from 'axios';
//import ReportsService from "./reportsService";


export default class SearchBarProtocoles extends Component {
  
  submit = (values, actions) => {
    const query = '?' + Object.keys(values).map( k => `${ k }=${ values[k]}&`).join('');
    console.log(query)
    //axios.get(`https://frozen-dawn-43758.herokuapp.com/ordonnances`+ query)
    this.props.filterSearchProtocoles(query);
    actions.setSubmitting(false);
    //ReportsService.updateSearch(query)
    //apiMovie.get('/search/movie' + query)
           // .then( response => response.data )
        
          //  .then( actions.setSubmitting(false))
          //  .catch( err => console.log(err));
        
  }
  
  render() {
    return (
      <Formik
        onSubmit={ this.submit }
        initialValues={ {  protocoleTitre_contains: '' } }
      >
        { ({ handleSubmit, handleChange, handleBlur, isSubmitting }) => (
         

         <div className="container-fluid p-2">
           <div className="row">
         
          <form  className="col s12" onSubmit={ handleSubmit }>
          <div className="row">
       

         
          <div className="form-group col-7 s12 m-2">
              <input className="form-control" name="protocoleTitre_contains"  placeholder="Search ..." onChange={ handleChange } onBlur={ handleBlur } />
            </div> 
       
       
          <div className="col-3 s12 m-2 d-flex justify-content-end" style={{marginTop:0, padding:0}}>
            <button className="btn btn-small btn-success" type="submit" disabled={ isSubmitting } >Submit</button>
          </div> 
            
           
          </div>
          </form>
          </div>
          </div>

        )}

      </Formik>
    )
  }
}