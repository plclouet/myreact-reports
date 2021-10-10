import React from 'react';

//import timelineData from '../timelinePage';
import TimelineItem from './TimelineItem';

const Timeline = ({datas}) => {
  
        return(
datas.length > 0 && (
        <div className="timeline-container">
            
            {datas.map((data, idx) => (
                
                <TimelineItem data={data} key={idx} />
            ))}
        </div>

    ))
};

export default Timeline;