import React, { useState } from "react";
import "./App.css";
import 'animate.css'
import { FaTrash } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/default.min.css';

// Component definition
function App() {
  const [selectedDate, setSelectedDate] = useState("");
  const [note, setNote] = useState("");
  const [savedActions, setSavedActions] = useState([]);

  // Handle change event for the date input
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  // Handle change event for the note input
  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  // Handle save action
  const handleSaveAction = () => {
    if (!note.trim()) {
      alertify.warning('Please enter a note before saving.', 2);
      return;
    }

    if (!selectedDate.trim()) {
      alertify.warning('Please enter a date before saving', 2);
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

  // Handle clear all actions
  const handleClearAll = () => {
    setShowModal(true);
  };

  // Handle clear all actions confirmation
  const handleClearAllConfirmed = () => {
    if (savedActions.length === 0) {
      alertify.warning('No saved dates to delete');
      return;
    }

    setSavedActions([]);
    localStorage.removeItem("savedActions");
    setShowModal(false);
    alertify.success('Delete All Date ', 2);
  };

  // Handle clear actions
  const handleClearActions = () => {
    setShowModal(true);
  };

  // Handle delete action
  const handleDeleteAction = (index) => {
    const newSavedActions = [...savedActions];
    newSavedActions.splice(index, 1);
    setSavedActions(newSavedActions);
    localStorage.setItem("savedActions", JSON.stringify(newSavedActions));
  };

  // Handle edit action
  const handleEditAction = (index) => {
    const selectedAction = savedActions[index];
    setSelectedDate(selectedAction.date);
    setNote(selectedAction.note);
    const newSavedActions = [...savedActions];
    newSavedActions.splice(index, 1);
    setSavedActions(newSavedActions);
    localStorage.setItem("savedActions", JSON.stringify(newSavedActions));
  };

  // Component mount effect
  React.useEffect(() => {
    var preloader = document.getElementsByClassName('preloader');
    window.addEventListener('load', function () {
      preloader[0].style.display = "none";
      document.body.classList.remove('loading');
    });

    const savedActionsJson = localStorage.getItem("savedActions");
    if (savedActionsJson) {
      setSavedActions(JSON.parse(savedActionsJson));
    }
  }, []);

  return (

    <>

      <div className="loading">
        <div className="preloader">
          <div className="preloader-spinner"></div>
        </div>

        <main className="App">
          {/* Modal for confirmation */}
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
              <div className="input-group">
                <label className="label">Select a date and time:</label>
                <input
                  autoComplete="off"
                  name="Email"
                  id="Email"
                  className="input"
                  type="datetime-local"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
                <div></div>
              </div>
            </label>
            <label>
              <br />
              <div className="input-group">
                <label className="label">Leave a note</label>
                <textarea
                  autoComplete="off"
                  name="Email"
                  id="Email"
                  className="input"
                  value={note}
                  onChange={handleNoteChange}
                />
                <div></div>
              </div>
            </label>
            <div className="buttons">
              <button onClick={handleSaveAction}>Save</button>
              <button onClick={handleClearAll}>Clear All</button>
            </div>
          </aside>

          <aside className="ShowDateSection">
            {savedActions.length === 0 && <p className="NoActions">No actions saved yet.</p>}
            {savedActions.map((action, index) => (
              <div className="ActionCard animate__animated animate__fadeIn" key={index}>
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
    </>

  );
}

export default App;
