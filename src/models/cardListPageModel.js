import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faClipboard } from "@fortawesome/free-solid-svg-icons";

//import styles from "./cardListPageModel.module.css";



const CardListPageModel = ({model, deleteSweetModel, borderColor = '#009688'}) => {

 
  const [color, setColor] = useState();
  //const history = useHistory();
 
  const showBorder = () => {
    setColor(borderColor);
  };
 
  const hideBorder = () => {
    setColor('#f5f5f5');
  };



  if (model){

  
  return (
    // <div className="container">
    // <div className="row-4">
    // <div className="col-md-4" onMouseEnter={showBorder} onMouseLeave={hideBorder}>
    <div className="col-12 col-md-6 col-lg-4 col-xl-3 p-1">
       <div className="card text-center" style={{ borderColor: color, height: 300 }} onMouseEnter={showBorder} onMouseLeave={hideBorder}>
            {/* <img class="card-img-top" src="..." alt="Card image cap"> */}
            <div className="card-header">
              <h5>{model.modelTitre}</h5>
            </div>
            <div className="card-body overflow-hidden">
              
              
                <div  >
                     <p className="card-text col">{model.modelContent}</p>
                </div>
            </div>
              
            <div className="card-footer text-muted" align="center">
                        <button className="btn btn-danger btn-sm mx-1" onClick={() =>{deleteSweetModel(model.id)}}>
                          Delete
                        </button>
                         <Link to={`/edit-model/${model.id}`}>
                          <button className="btn btn-primary btn-sm mx-1">Edit</button>
                        </Link>
                        
                </div>
                
            
          </div>
       </div>
      // </div>
      // </div>
  )} return null;
}
 
export default CardListPageModel;