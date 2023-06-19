import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

const ShowDateSection = ({ savedActions, handleEditAction, handleDeleteAction }) => {
    return (
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
    );
};

export default ShowDateSection;
