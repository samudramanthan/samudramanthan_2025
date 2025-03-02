import React, { useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons'; 

import timelinedata from '../data/EventTimeline';

function Timeline({ day }) {
  // Filter the timeline data based on the day prop
  const filteredData = timelinedata.filter((element) => element.day === day);

  return (
    <div className='my-3'>
    <VerticalTimeline lineColor='hsl(205, 38%, 89%)' animate={true}>
      {filteredData.map((element) => (
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: '#f0f6ff' }}
          key={element.id}
          contentArrowStyle={{ borderRight: '12px solid #f0f6ff' }}
          date={element.date}
          iconStyle={{ background: 'linear-gradient( to bottom right, #8f12fd, #4294e3 )', color: 'white'}}
          icon={<FontAwesomeIcon icon={faEye} />}
        >
          <h4 className="vertical-timeline-element-title">{element.title}</h4>
          <h5 className="vertical-timeline-element-subtitle">{element.time}</h5>
          <p>{element.location}</p>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
    </div>
  );
}

export default Timeline;
