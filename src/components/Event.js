/* eslint-disable semi */
import React, { useState } from 'react';

const Event = ({ event }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <li className='event'>
      <h2>{event.summary}</h2>
      <p>{event && (new Date(event.created)).toUTCString()}</p>
      <p>{event.location}</p>
      <button
        className='details-btn'
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? 'Show Details' : 'Hide Details'}
      </button>
      {!isCollapsed && (
        <p className="details">{event && event.description}</p>
      )}
    </li>
  );
}

export default Event;
