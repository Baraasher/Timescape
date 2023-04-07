import React, { useState } from "react";
import "./App.css";
import 'animate.css'
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

  const [showModal, setShowModal] = useState(false);

  const handleClearAll = () => {
    setShowModal(true);
  };

  const handleClearAllConfirmed = () => {
    setSavedActions([]);
    localStorage.removeItem("savedActions");
    setShowModal(false);
  };
  
  const handleClearActions = () => {
    setShowModal(true);
  };
  
  
<button onClick={handleClearAll}>Clear All</button>

  

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

    var preloader = document.getElementsByClassName('preloader');
  
    window.addEventListener('load', function() {
      preloader[0].style.display = "none";
      document.body.classList.remove('loading');
    });
    
    const savedActionsJson = localStorage.getItem("savedActions");
    if (savedActionsJson) {
      setSavedActions(JSON.parse(savedActionsJson));
    }
  }, []);
  
  
  return (


    <div class="loading">
    <div class="preloader">
      <div class="preloader-spinner"></div>
    </div>
    <main className="App">
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Are you sure you want to clear all actions?</h2>
            <div className="modal-buttons">
              <button onClick={handleClearAllConfirmed}>Yes</button>
              <button onClick={() => setShowModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}
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
          <button onClick={handleClearAll}>Clear All</button>
        </div>
      </aside>
      <aside className="ShowDateSection">
        <h2>Saved Actions:</h2>
        {savedActions.length === 0 && <p>No actions saved yet.</p>}
        {savedActions.map((action, index) => (
          <div className="ActionCard" key={index}>
            <div>
              <h5>Date and Time:</h5>
              <p id="dateActionDiv"> {action.date}</p>
            </div>    
            <div>
              <h5>Note: </h5>
            </div>
            <p>{action.note}</p>
            <div className="ActionButtons">
              <button onClick={() => handleEditAction(index)}>
                <FaEdit size={14} color="#fff" />
              </button>
              <button onClick={() => handleDeleteAction(index)}>
                <FaTrash size={14} color="#fff" />
              </button>
            </div>
          </div>
        ))}
      </aside>
    </main>
  </div>
  
  );
}
export default App;
