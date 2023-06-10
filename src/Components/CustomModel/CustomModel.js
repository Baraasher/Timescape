import React, { useState, useEffect } from "react";
import { Modal, Button, Text, Input } from "@nextui-org/react";
import "./CustomModel.css";

export default function CustomModel() {
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState("");

    useEffect(() => {
        // Check if it's the user's first time visiting
        const isFirstTime = localStorage.getItem("isFirstTime");
        if (!isFirstTime) {
            // Set the modal to visible and mark isFirstTime as false in local storage
            setVisible(true);
            localStorage.setItem("isFirstTime", "false");
        }
    }, []);

    const handleNameChange = (e) => {
        // Update the name state with the input value
        setName(e.target.value);
    };

    const handleButtonClick = () => {
        console.log("Name:", name);
        // Store the user's name in local storage
        localStorage.setItem("userName", name);
        // Hide the modal, reset the name state, and reload the page
        setVisible(false);
        setName("");
        window.location.reload();
    };

    useEffect(() => {
        const modalElement = document.getElementById("Modal");
        // Update the display style of the modal based on the visibility state
        if (!visible) {
            modalElement.style.display = "none";
        } else {
            modalElement.style.display = "block";
        }
    }, [visible]);

    return (
        <div id="Modal">
            {visible && (
                <Modal
                    aria-labelledby="modal-title"
                    open={visible}
                    onClose={() => setVisible(false)}
                >
                    <Modal.Header>
                        <Text id="modal-title" size={18}>
                            Welcome to Timescape
                        </Text>
                    </Modal.Header>
                    <Modal.Body>
                        <Input
                            clearable
                            bordered
                            fullWidth
                            color="primary"
                            size="lg"
                            placeholder="Your Name?"
                            value={name}
                            onChange={handleNameChange}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button auto onPress={handleButtonClick}>
                            Continue
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
}  