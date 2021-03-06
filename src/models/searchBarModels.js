import React, { Component } from 'react';
import { Formik } from 'formik';
//import axios from 'axios';
//import ReportsService from "./reportsService";


export default class SearchBarModels extends Component {
  
  submit = (values, actions) => {
    const query = '?' + Object.keys(values).map( k => `${ k }=${ values[k]}&`).join('');
    console.log(query)
    this.props.filterSearchModels(query);
    actions.setSubmitting(false);
        
  }
  
  render() {
    return (
      <Formik
        onSubmit={ this.submit }
        initialValues={ {  modelTitre_contains: '' } }
      >
        { ({ handleSubmit, handleChange, handleBlur, isSubmitting }) => (
         

         <div className="container-fluid p-2 ">
           <div className="row">
         
          <form  className="col s12" onSubmit={ handleSubmit }>
          <div className="row">
       

         
           <div className="form-group col s12 m-2">
              <input className="form-control" name="modelTitre_contains"  placeholder="Search ..." onChange={ handleChange } onBlur={ handleBlur } />
            </div> 
       


          
           {/*  <div className="form-group col s12 m2">
            <select className="browser-default custom-select" name="modelTitre_contains"  onChange={ handleChange } onBlur={ handleBlur }>
              <option value="">tous</option>
              <option value="crane">crane</option>
              <option value="ophtalmo">ophtalmo</option>
              <option value="ORL">ORL</option>
              <option value="mammaire">mammaire</option>
              <option value="cervicale">cervicale</option> 
              <option value="dorsale">dorsale</option> 
              <option value="lombaire">lombaire</option> 
              <option value="bassin">bassin</option> 
              <option value="foie">foie</option> 
              <option value="pancreas">pancreas</option> 
              <option value="renale">renale</option>
              <option value="epaule">epaule</option> 
              <option value="coude">coude</option> 
              <option value="poignet">poignet</option> 
              <option value="hanche">hanche</option>    
              <option value="genou">genou</option> 
              <option value="cheville">cheville</option> 
              <option value="pied">pied</option>     
            </select>
            </div> */}
       
          <div className="col s12 m-2 d-flex justify-content-end" style={{marginTop:0, padding:0}}>
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