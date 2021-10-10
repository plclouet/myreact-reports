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
import ListPageProtocoles from "./protocoles/listPageProtocoles";
import EditProtocole from "./protocoles/editProtocole";
import ListPageModels from "./models/listPageModels";
import EditModel from "./models/editModel";
import TimeLinePage from "./timeline";


export default function App() {
  return (
    <Router>
      <div>
        <Header />
        
          
          <div className="container-fluid d-flex align-items-center flex-column p-0">
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
          <PrivateRoute  path="/list-models" comp={ListPageModels}>
          
          </PrivateRoute>
          <PrivateRoute  path="/add-protocole" comp={AddProtocole}>
          
          </PrivateRoute>
          <PrivateRoute  path="/list-protocoles" comp={ListPageProtocoles}>
          
          </PrivateRoute>
          <PrivateRoute  path="/edit-protocole" comp={EditProtocole}>
          
          </PrivateRoute>
          <PrivateRoute  path="/edit-model" comp={EditModel}>
          
          </PrivateRoute>
          <PrivateRoute  path="/timeline" comp={TimeLinePage}>
          
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
