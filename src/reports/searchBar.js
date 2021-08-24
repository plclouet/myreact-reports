import React, { Component } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
//import ReportsService from "./reportsService";


export default class SearchBar extends Component {
  
  submit = (values, actions) => {
    const query = '?' + Object.keys(values).map( k => `${ k }=${ values[k]}&`).join('');
    console.log(query)
    //axios.get(`https://frozen-dawn-43758.herokuapp.com/ordonnances`+ query)
   axios.get('http://localhost:1337/reports' + query)
    //ReportsService.updateSearch(query)
    //apiMovie.get('/search/movie' + query)
            .then( response => response.data )
        
            .then( reportsListUpdate => {
            //   const movies = moviesApi.map(apiMovieMap)
                console.log(reportsListUpdate)
               this.props.updateSearchReports(reportsListUpdate);
               actions.setSubmitting(false);
             })
            .catch( err => console.log(err));
        
  }
  
  render() {
    return (
      <Formik
        onSubmit={ this.submit }
        initialValues={ { nom_contains: '', examen_contains: '' } }
      >
        { ({ handleSubmit, handleChange, handleBlur, isSubmitting }) => (
         

         <div className="container-fluid">
           <div className="row">
         
          <form  className="col s12" onSubmit={ handleSubmit }>
          <div className="row">
       

         
            <div className="form-group col-6 col-md-4 py-2">
              <input className="form-control" name="nom_contains"  placeholder="Search ..." onChange={ handleChange } onBlur={ handleBlur } />
            </div> {/* fin de row */}
       


          
            <div className="form-group col-6 col-md-4 py-2">
            <select className="browser-default custom-select" name="examen_contains"  onChange={ handleChange } onBlur={ handleBlur }>
              <option value="">tous</option>
              <option value="IRMosteo">IRMosteo</option>
              <option value="IRMgene">IRMgene</option>          
            </select>
            </div>
       
          <div className="col py-2" style={{marginTop:0}}>
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