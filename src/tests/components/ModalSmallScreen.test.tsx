import { render, screen } from "@testing-library/react";
import ModalSmallScreen from "src/components/UI/ModalSmallScreen";

describe("Modal", () => {
  const onClose = jest.fn();

  it("renders children when open prop is true", async () => {
    render(
      <ModalSmallScreen open={true} onClose={onClose} showAlert={false}>
        <div>Modal content</div>
      </ModalSmallScreen>
    );
    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("does not render children when open prop is false", async () => {
    render(
      <ModalSmallScreen open={false} onClose={onClose} showAlert={false}>
        <div>Modal content</div>
      </ModalSmallScreen>
    );
    expect(screen.queryByText("Modal content")).not.toBeInTheDocument();
  });
});
