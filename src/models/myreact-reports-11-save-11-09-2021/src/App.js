import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import AddReport from "./reports/addReport";
import EditReport from "./reports/editReport";
import ShowReport from "./reports/showReport";
import React from "react";
import ReportsList from "./reports/reportsList";
import PrintReportsList from "./reports/printReportsList";
import AddModel from "./models/addModel";
import AddProtocole from "./protocoles/addProtocole";
import Header from './header';
import PrivateRoute from './privateRoute';
import LoginForm from "./loginForm";

export default function App() {
  return (
    <Router>
      <div>
        <Header />
        
          
          <div className="container d-flex align-items-center flex-column">
           <Switch> 
          <PrivateRoute  path="/add-report" comp={AddReport}>
            
          </PrivateRoute>
          <PrivateRoute  path="/edit-report" comp={EditReport}>
           
          </PrivateRoute>
          <PrivateRoute  path="/print-report" comp={PrintReportsList}>
            
          </PrivateRoute>
          <PrivateRoute  path="/show-report" comp={ShowReport}>
         
          </PrivateRoute>
          <PrivateRoute  path="/add-model" comp={AddModel}>
          
          </PrivateRoute>
          <PrivateRoute  path="/add-protocole" comp={AddProtocole}>
          
          </PrivateRoute>
          <Route path="/login">
            <LoginForm />
          </Route>
          <PrivateRoute exact path="/" comp={ReportsList}>
            
          </PrivateRoute>
           </Switch>
          </div>
       
        {/* <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/> */}
      </div>
    </Router>
  );
}
