function AddDateSection({ handleSaveAction, handleClearAll, selectedDate, handleDateChange, note, handleNoteChange }) {
  return (
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
  );
}

export default AddDateSection;
