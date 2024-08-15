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
      <input
        type="text"
        className="number"
        value={eventNumber}
        onChange={handleInputChanged}
      />
    </div>
  )
}

export default NumberOfEvents;
