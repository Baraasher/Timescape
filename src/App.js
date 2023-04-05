import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedDate, setSelectedDate] = useState('');
  const [note, setNote] = useState('');
  const [savedActions, setSavedActions] = useState([]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleSaveAction = () => {
    const newAction = { date: selectedDate, note: note };
    const newSavedActions = [...savedActions, newAction];
    setSavedActions(newSavedActions);
    localStorage.setItem('savedActions', JSON.stringify(newSavedActions));
    setSelectedDate('');
    setNote('');
  };

  const handleClearActions = () => {
    setSavedActions([]);
    localStorage.removeItem('savedActions');
  };

  React.useEffect(() => {
    const savedActionsJson = localStorage.getItem('savedActions');
    if (savedActionsJson) {
      setSavedActions(JSON.parse(savedActionsJson));
    }
  }, []);

  return (
    <div className="App">

<aside className='AddDateSection'> 

      <h1>Time Picker with Notes</h1>
      <label>
        Select a date and time:
        <input type="datetime-local" value={selectedDate} onChange={handleDateChange} />
      </label>
      <br />
      <label>
        Add a note:
        <textarea value={note} onChange={handleNoteChange}></textarea>
      </label>
      <br />
      <button onClick={handleSaveAction}>Save</button>
      <button onClick={handleClearActions}>Clear All</button>

      </aside>

      <aside className='ShowDateSection'> 

      </aside>


      <h2>Saved Actions:</h2>
      {savedActions.length === 0 && <p>No actions saved yet.</p>}
      {savedActions.map((action, index) => (
        <div key={index}>
          <p>Date and Time: {action.date}</p>
          <p>Note: {action.note}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
