// import { render } from '@testing-library/react';
import React from 'react';

const TimelineItem = ({ data }) => {
    
    const isRight = data.examen;
   
  
    
    if (isRight==="IRMosteo"){
        return(
          
            <div className="timeline-item right">
            
            <div className="timeline-item-content">
                
                <span className="tag" style={{ backgroundColor: "#636e72" }}>
                    {data.examen}
                </span>
                <time className="pb-2">{data.rdvDate.slice(0,16)}</time>
                <p>{data.nom} {data.prenom}</p>
                <span>{data.titre}</span>
                
                <span className="circle" />
            </div>
           
        </div>
        )}else{
            return(
                <div className="timeline-item">
                <div className="timeline-item-content">
                    
                    <span className="tag" style={{ backgroundColor: "#273c75" }}>
                        {data.examen}
                    </span>
                    <time className="pb-2">{data.rdvDate.slice(0,16)}</time>
                    <p>{data.nom} {data.prenom}</p>
                    <span>{data.titre}</span>
                    
                    <span className="circle" />
                </div>
            </div>
            )

        }
 
     
    

    
   
  
};

export default TimelineItem;