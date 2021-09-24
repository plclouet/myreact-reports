import React, { Component } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
//import ReportsService from "./reportsService";


export default class SearchBarProtocoles extends Component {
  
  submit = (values, actions) => {
    const query = '?' + Object.keys(values).map( k => `${ k }=${ values[k]}&`).join('');
    console.log(query)
    //axios.get(`https://frozen-dawn-43758.herokuapp.com/ordonnances`+ query)
   axios.get('http://localhost:1337/protocoles' + query)
    //ReportsService.updateSearch(query)
    //apiMovie.get('/search/movie' + query)
            .then( response => response.data )
        
            .then( protocolesListUpdate => {
            //   const movies = moviesApi.map(apiMovieMap)
                console.log(protocolesListUpdate)
               this.props.updateSearchProtocoles(protocolesListUpdate);
               actions.setSubmitting(false);
             })
            .catch( err => console.log(err));
        
  }
  
  render() {
    return (
      <Formik
        onSubmit={ this.submit }
        initialValues={ {  protocoleTitre_contains: '' } }
      >
        { ({ handleSubmit, handleChange, handleBlur, isSubmitting }) => (
         

         <div className="container-fluid p-5">
           <div className="row">
         
          <form  className="col s12" onSubmit={ handleSubmit }>
          <div className="row">
       

         
           {/*  <div className="form-group col s12 m6">
              <input className="form-control" name="nom_contains"  placeholder="Search ..." onChange={ handleChange } onBlur={ handleBlur } />
            </div> */}
       


          
            <div className="form-group col s12 m2">
            <select className="browser-default custom-select" name="protocoleTitre_contains"  onChange={ handleChange } onBlur={ handleBlur }>
              <option value="">tous</option>
              <option value="crane">crane</option>
              <option value="foie">foie</option>    
              <option value="genou">genou</option> 
              <option value="pancreas">pancreas</option>       
            </select>
            </div>
       
          <div className="col" style={{marginTop:0}}>
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