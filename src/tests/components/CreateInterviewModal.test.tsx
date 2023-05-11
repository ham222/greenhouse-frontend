import React from "react"
import ReactDOM from "react-dom/client"
import { render, screen } from "@testing-library/react";
import CreateIntervalModal from "src/components/containers/Watering/CreateIntervalModal";
import "@testing-library/jest-dom";

describe("CreateIntervalModal", () => {

    const onClose = jest.fn()
    const onAdd = jest.fn()

    it("Renders without crashing", () => {
        const root = ReactDOM.createRoot(document.createElement("div"))
    root.render(<CreateIntervalModal open={true} onClose={onClose} onAdd={onAdd} />)
    })
})