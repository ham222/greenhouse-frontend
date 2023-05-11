import { fireEvent, render, screen } from "@testing-library/react";
import Dropdown from "src/components/UI/Dropdown";
import "@testing-library/jest-dom";

describe("Dropdown", () => {
  it("renders correctly", () => {
    render(
      <Dropdown
        title={"Test Title"}
        onSelect={(option) => {}}
        options={["option 0", "option 1", "option 2"]}
      />
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.queryByText("option 0")).not.toBeInTheDocument();
    expect(screen.queryByText("option 1")).not.toBeInTheDocument();
    expect(screen.queryByText("option 2")).not.toBeInTheDocument();
  });

  it("renders correctly when opened", () => {
    render(
      <Dropdown
        title={"Test Title"}
        onSelect={(option) => {}}
        options={["option 0", "option 1", "option 2"]}
      />
    );

    fireEvent.click(screen.getByText("Test Title"));

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("option 0")).toBeInTheDocument();
    expect(screen.getByText("option 1")).toBeInTheDocument();
    expect(screen.getByText("option 2")).toBeInTheDocument();
  });

  it("fires onSelect", () => {
    const mockFn = jest.fn();

    render(
      <Dropdown
        title={"Test Title"}
        onSelect={mockFn}
        options={["option 0", "option 1", "option 2"]}
      />
    );

    fireEvent.click(screen.getByText("Test Title"));
    fireEvent.click(screen.getByText("option 1"));
    expect(mockFn).lastCalledWith("option 1");
  });

  it("renders correctly when opened and closed", () => {
    render(
      <Dropdown
        title={"Test Title"}
        onSelect={(option) => {}}
        options={["option 0", "option 1", "option 2"]}
      />
    );

    fireEvent.click(screen.getByText("Test Title"));
    fireEvent.click(screen.getByText("Test Title"));

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.queryByText("option 0")).not.toBeInTheDocument();
    expect(screen.queryByText("option 1")).not.toBeInTheDocument();
    expect(screen.queryByText("option 2")).not.toBeInTheDocument();
  });
});
