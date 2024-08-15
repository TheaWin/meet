/* eslint-disable semi */
import { useState } from "react";

const NumberOfEvents = () => {
  const [eventNumber, setEventNumber] = useState('32');

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setEventNumber(value);
  }

  return (
    <div id="number-of-events">
      <label htmlFor="number-of-events-input">Number of Events: </label>
      <input
        type="text"
        id="number-of-events-input"
        className="number-of-events-input"
        value={eventNumber}
        onChange={handleInputChanged}
      />
    </div>
  )
}

export default NumberOfEvents;
