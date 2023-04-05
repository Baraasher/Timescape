import React, { useState, useEffect } from 'react';

function DateTimePicker() {
  const [selectedDateTime, setSelectedDateTime] = useState('');

  useEffect(() => {
    const savedDateTime = localStorage.getItem('selectedDateTime');
    if (savedDateTime !== null) {
      setSelectedDateTime(savedDateTime);
    }
  }, []);

  const handleDateTimeChange = (event) => {
    const newDateTime = event.target.value;
    setSelectedDateTime(newDateTime);
  };

  const handleSaveClick = () => {
    localStorage.setItem('selectedDateTime', selectedDateTime);
    alert('Selected date/time saved to local storage!');
  };

  return (
    <div>
      <h1>Date Time Picker</h1>
      <label htmlFor="datetime">Select a date and time:</label>
      <input type="datetime-local" id="datetime" value={selectedDateTime} onChange={handleDateTimeChange} /><br /><br />
      <button onClick={handleSaveClick}>Save</button>
    </div>
  );
}

export default DateTimePicker;
