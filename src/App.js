import React, { useState } from "react";
import "./App.css";
import "./styles/SVG_background.css";
import "animate.css";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/themes/default.min.css";
import toast, { Toaster } from "react-hot-toast";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
      toast("Please Type A Note", {
        icon: "🗒️",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });

      return;
    }

    if (!selectedDate.trim()) {
      toast("Please Type A Date", {
        icon: "📅",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });

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
      toast("No saved dates to delete!", {
        icon: "❕",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });

      setShowModal(false);

      return;
    }

    setSavedActions([]);
    localStorage.removeItem("savedActions");
    setShowModal(false);
    toast.success("All Actions Clear Successful!");
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
    var preloader = document.getElementsByClassName("preloader");
    window.addEventListener("load", function () {
      preloader[0].style.display = "none";
      document.body.classList.remove("loading");
    });

    const savedActionsJson = localStorage.getItem("savedActions");
    if (savedActionsJson) {
      setSavedActions(JSON.parse(savedActionsJson));
    }
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(savedActions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSavedActions(items);
  };

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="loading">
        <div className="preloader">
          <div className="preloader-spinner"></div>
        </div>

        <main className="App">
          {/* Modal for confirmation */}
          {showModal && (
            <div
              className="modal animate__animated animate__fadeIn"
              style={{
                animationDuration: "0.5s",
              }}
            >
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

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable-1">
              {(provided) => (
                <aside
                  className="ShowDateSection"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {savedActions.length === 0 && (
                    <p className="NoActions">No actions saved yet.</p>
                  )}
                  {savedActions.map((action, index) => (
                    <Draggable
                      key={index}
                      draggableId={`item-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="ActionCard animate__animated animate__fadeIn"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div>
                            <h5>Date and Time:</h5>
                            <p id="dateActionDiv"> {action.date}</p>
                          </div>
                          <div>
                            <h5>Note: </h5>
                          </div>
                          <p>{action.note}</p>
                          <div className="ActionButtons">
                            <button
                              onClick={() => handleEditAction(index)}
                            >
                              <FaEdit size={14} color="#fff" />
                            </button>
                            <button
                              onClick={() => handleDeleteAction(index)}
                            >
                              <FaTrash size={14} color="#fff" />
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </aside>
              )}
            </Droppable>
          </DragDropContext>
        </main>
      </div>
    </>
  );
}

export default App;
