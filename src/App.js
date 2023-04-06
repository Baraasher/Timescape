import React, { useState } from "react";
import "./App.css";
import { FaTrash } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';

function App() {
  const [selectedDate, setSelectedDate] = useState("");
  const [note, setNote] = useState("");
  const [savedActions, setSavedActions] = useState([]);
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };
  const handleSaveAction = () => {
    if (!note.trim()) {
      alert("Please enter a note before saving.");
      return;
    }
    const newAction = { date: selectedDate, note: note };
    const newSavedActions = [...savedActions, newAction];
    setSavedActions(newSavedActions);
    localStorage.setItem("savedActions", JSON.stringify(newSavedActions));
    setSelectedDate("");
    setNote("");
  };
  const handleClearActions = () => {
    setSavedActions([]);
    localStorage.removeItem("savedActions");
  };

  const handleDeleteAction = (index) => {
    const newSavedActions = [...savedActions];
    newSavedActions.splice(index, 1);
    setSavedActions(newSavedActions);
    localStorage.setItem("savedActions", JSON.stringify(newSavedActions));
  };

  const handleEditAction = (index) => {
    const selectedAction = savedActions[index];
    setSelectedDate(selectedAction.date);
    setNote(selectedAction.note);
    const newSavedActions = [...savedActions];
    newSavedActions.splice(index, 1);
    setSavedActions(newSavedActions);
    localStorage.setItem("savedActions", JSON.stringify(newSavedActions));
  };
  
  React.useEffect(() => {
    const savedActionsJson = localStorage.getItem("savedActions");
    if (savedActionsJson) {
      setSavedActions(JSON.parse(savedActionsJson));
    }
  }, []);
  return (
    <main className="App">
      <aside className="AddDateSection">
        <h1>Timescape</h1>
        <label>
          <div class="input-group">
            <label class="label">Select a date and time:</label>
            <input
              autocomplete="off"
              name="Email"
              id="Email"
              class="input"
              type="datetime-local"
              value={selectedDate}
              onChange={handleDateChange}
            />
            <div></div>
          </div>
        </label>
        <label>
          <br />
          <div class="input-group">
            <label class="label">Leave a note</label>
            <textarea
              autocomplete="off"
              name="Email"
              id="Email"
              class="input"
              value={note}
              onChange={handleNoteChange}
            />
            <div></div>
          </div>
        </label>
<div class="buttons">
        <button onClick={handleSaveAction}>Save</button>
        <button onClick={handleClearActions}>Clear All</button>
        </div>
      </aside>
      <aside className="ShowDateSection">
  <h2>Saved Actions:</h2>
  {savedActions.length === 0 && <p>No actions saved yet.</p>}
  {savedActions.map((action, index) => (
    <div className="ActionCard" key={index}>
  <div><h5>Date and Time:</h5><p> {action.date}</p></div>    
   <div><h5>Note: </h5></div>   <p>{action.note}</p>
      <div>

<div className="ActionButtons">

        <button onClick={() => handleEditAction(index)}><FaEdit size={14} color="#fff" /></button>
        <button onClick={() => handleDeleteAction(index)}><FaTrash size={14} color="#fff" />
</button>
</div>

      </div>
    </div>
  ))}
</aside>

    </main>
  );
}
export default App;
