/* eslint-disable semi */
import { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE }) => {
  const [inputValue, setInputValue] = useState(32);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setCurrentNOE(value);
  }

  return (
    <div id="number-of-events">
      <label htmlFor="number-of-events-input">Number of Events: </label>
      <div>
      <input
        type="text"
        id="number-of-events-input"
        className="number-of-events-input"
        value={inputValue}
        onChange={handleInputChanged}
      />
      </div>
    </div>
  )
}

export default NumberOfEvents;
