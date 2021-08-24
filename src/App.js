import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import AddReport from "./reports/addReport";
import EditReport from "./reports/editReport";
import ShowReport from "./reports/showReport";
import React from "react";
import ReportsList from "./reports/reportsList";
import PrintReportsList from "./reports/printReportsList";
import AddModel from "./models/addModel";
import AddProtocole from "./protocoles/addProtocole";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          
          <Route  path="/add-report">
            <AddReport />
          </Route>
          <Route  path="/edit-report">
            <EditReport />
          </Route>
          <Route  path="/print-report">
            <PrintReportsList />
          </Route>
          <Route  path="/show-report">
            <ShowReport />
          </Route>
          <Route  path="/add-model">
            <AddModel />
          </Route>
          <Route  path="/add-protocole">
            <AddProtocole />
          </Route>
          <Route exact path="/">
            <ReportsList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
