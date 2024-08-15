/* eslint-disable semi */
import React, { useState } from 'react';

const Event = ({ event }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <li>
      <h2>{event.summary}</h2>
      <p>{event.created}</p>
      <p>{event.location}</p>
      {/* <p>{event && (new Date(event.created)).toUTCString()}</p> */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? 'Show Details' : 'Hide Details'}
      </button>
      {!isCollapsed && (
        <div className='details'>
          <h3>About event</h3>
          <p>{event.description}</p>
        </div>
      )}
    </li>
  );
}

export default Event;
