import React, { Component } from 'react';
import { Formik } from 'formik';
//import axios from 'axios';
//import ReportsService from "./reportsService";


export default class SearchBar extends Component {
  
  submit = (values, actions) => {
    const query = '?' + Object.keys(values).map( k => `${ k }=${ values[k]}&`).join('');
    console.log(values);
    console.log(query);

    this.props.filterSearchReports(query);
    //axios.get(`https://frozen-dawn-43758.herokuapp.com/ordonnances`+ query)
  // axios.get('http://localhost:1337/reports' + query)
    //ReportsService.updateSearch(query)
    //apiMovie.get('/search/movie' + query)
       //     .then( response => response.data )
     actions.setSubmitting(false);
          //   .then( reportsListFilter => {
            //   const movies = moviesApi.map(apiMovieMap)
             //   console.log(reportsListFilter)
             //  this.props.filterSearchReports(reportsListFilter);
           //    actions.setSubmitting(false);
           //  }) 
          //  .catch( err => console.log(err));
        
  }

 
  
  render() {
    let today = new Date().toISOString().slice(0, 10);
    let dayAfter = new Date();
    let dMore2Months = new Date(dayAfter.setMonth(dayAfter.getMonth()+2));
    let twoMonthAfter = dMore2Months.toISOString().slice(0, 10);
    let dayBefore = new Date();
    let dLess1Month = new Date(dayBefore.setMonth(dayBefore.getMonth()-1));
    let oneMonthBefore = dLess1Month.toISOString().slice(0, 10);
    console.log(today);
    console.log(twoMonthAfter);
    console.log(oneMonthBefore);

    return (
      <Formik
        onSubmit={ this.submit }
        initialValues={ { nom_contains: '', examen_contains: '', rdvDate_gte:oneMonthBefore, rdvDate_lt:twoMonthAfter } }
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

            <div className="row">
             <div className="form-group col-6 col-md-4 py-2">
            <label htmlFor="rdvDate_gte">premiere date</label>
            <input
              type="date"
              className="form-control"
            
              name="rdvDate_gte"
              onChange={ handleChange } 
              onBlur={ handleBlur }
             
              
            />
          </div> 
          <div className="form-group col-6 col-md-4 py-2 ">
            <label htmlFor="rdvDate_lt">deuxieme date</label>
            <input
              type="date"
              className="form-control"
              
              name="rdvDate_lt"
              onChange={ handleChange } 
              onBlur={ handleBlur }
             
              
            />
          </div> 

        
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