import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faClipboard } from "@fortawesome/free-solid-svg-icons";

//import styles from "./cardListReport.module.css";



const CardListReport = ({sortedReport, borderColor = '#009688'}) => {

 
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
    <div className="col-12 col-lg-4">
       <div class="card" style={{ borderColor: color }}>
            {/* <img class="card-img-top" src="..." alt="Card image cap"> */}
            <div class="card-body">
              <h5 class="card-title">{sortedReport.nom} {sortedReport.prenom}</h5>
              <p class="card-text">{sortedReport.titre}</p>
              <div align="center">
                        <button className="btn btn-danger btn-sm mx-1" onClick={() =>{this.deleteSweetReport(sortedReport.id)}}>
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