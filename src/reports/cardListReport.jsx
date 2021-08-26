import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faClipboard } from "@fortawesome/free-solid-svg-icons";

//import styles from "./cardListReport.module.css";



const CardListReport = ({sortedReport, deleteSweetReport, borderColor = '#009688'}) => {

 
  const [color, setColor] = useState();
  //const history = useHistory();
 
  const showBorder = () => {
    setColor(borderColor);
  };
 
  const hideBorder = () => {
    setColor('#f5f5f5');
  };



  if (sortedReport){

  
  return (
    // <div className="container">
    // <div className="row-4">
    // <div className="col-md-4" onMouseEnter={showBorder} onMouseLeave={hideBorder}>
    <div className="col-12 col-md-6 col-lg-4 col-xl-3 p-1">
       <div className="card" style={{ borderColor: color }} onMouseEnter={showBorder} onMouseLeave={hideBorder}>
            {/* <img class="card-img-top" src="..." alt="Card image cap"> */}
            <div className="card-body">
              <h5 className="card-title">{sortedReport.nom} {sortedReport.prenom}</h5>
              <p className="card-text">{sortedReport.titre} {sortedReport.rdvDate.slice(0,16)}</p>
              <div align="center">
                        <button className="btn btn-danger btn-sm mx-1" onClick={() =>{deleteSweetReport(sortedReport.id)}}>
                          Delete
                        </button>
                        <Link to={`/edit-report/${sortedReport.id}`}>
                          <button className="btn btn-primary btn-sm mx-1">Edit</button>
                        </Link>
                        <Link to={`/show-report/${sortedReport.id}`}>
                          <button className="btn btn-secondary btn-sm">Show</button>
                        </Link>
                </div>
            </div>
          </div>
       </div>
      // </div>
      // </div>
  )} return null;
}
 
export default CardListReport;