// import { render } from '@testing-library/react';
import React from 'react';
import { Link } from "react-router-dom";

const TimelineItem = ({ data }) => {
    
    const isRight = data.examen;
   
  
    
    if (isRight==="IRMgene"){
        return(
          
            <div className="timeline-item right">
            
            <div className="timeline-item-content">
                
                <span className="tag" style={{ backgroundColor: "#636e72" }}>
                    {data.examen}
                </span>
                <time className="pb-2">{data.rdvDate.slice(0,16)}</time>
                <p>{data.nom} {data.prenom}</p>
                <div>{data.titre}</div>
                <div className="after-none">
                        <Link to={`/edit-report/${data.id}`}>
                          <button className="btn btn-primary btn-sm mx-2">Edit</button>
                        </Link>
                     
                    
                        <Link to={`/show-report/${data.id}`}>
                          <button className="btn btn-secondary btn-sm mx-auto">Show</button>
                        </Link>
                </div>
               
                   
                <span className="circle" />
            </div>
           
        </div>
        )}else{
            return(
                <div className="timeline-item left">
                <div className="timeline-item-content">
                    
                    <span className="tag" style={{ backgroundColor: "#273c75" }}>
                        {data.examen}
                    </span>
                    <time className="pb-2">{data.rdvDate.slice(0,16)}</time>
                    <p>{data.nom} {data.prenom}</p>
                    
                    <div className="after-none">
                            
                            <Link to={`/show-report/${data.id}`}>
                            <button className="btn btn-secondary btn-sm mx-auto">Show</button>
                            </Link>
                            <Link to={`/edit-report/${data.id}`}>
                            <button className="btn btn-primary btn-sm mx-2">Edit</button>
                            </Link>
                    </div>
                    <div>{data.titre}</div>
                    <span className="circle" />
                </div>
            </div>
            )

        }
 
     
    

    
   
  
};

export default TimelineItem;