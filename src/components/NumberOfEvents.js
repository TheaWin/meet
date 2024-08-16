/* eslint-disable semi */
import { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  const [inputValue, setInputValue] = useState(32);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setCurrentNOE(value);

    let errorText;
    if (isNaN(value) || value >100 || value <= 0) {
      errorText = 'Please enter a number between 1 and 100'
    } else {
      errorText = ''
    }
    setErrorAlert(errorText);
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
