import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import UpdateIntervalModal from "src/components/containers/Watering/UpdateIntervalModal";
import Interval from "src/domain/Interval";
import IntervalDto from "src/domain/IntervalDto";

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe("UpdateIntervalModal", () => {
  window.ResizeObserver = ResizeObserver;
  const onClose = jest.fn();
  const onUpdate = jest.fn();

  it("renders correctly", async () => {
    render(
      <UpdateIntervalModal
        toUpdate={new Interval(0, "12:30:00", "13:00:00", 2)}
        open={true}
        onClose={onClose}
        onUpdate={onUpdate}
      />
    );

    expect(screen.getByDisplayValue("12")).toBeInTheDocument();
    expect(screen.getByDisplayValue("30")).toBeInTheDocument();
    expect(screen.getByDisplayValue("13")).toBeInTheDocument();
    expect(screen.getByDisplayValue("00")).toBeInTheDocument();
  });

  it("disables confirm button when interval is invalid", async () => {
    render(
      <UpdateIntervalModal
        toUpdate={new Interval(0, "12:30:00", "12:00:00", 2)}
        open={true}
        onClose={onClose}
        onUpdate={onUpdate}
      />
    );

    expect(screen.getByRole("button", { name: "Confirm" })).toBeDisabled();
  });

  it("calls onUpdate with correct values", async () => {
    render(
      <UpdateIntervalModal
        toUpdate={new Interval(0, "12:30:00", "13:00:00", 2)}
        open={true}
        onClose={onClose}
        onUpdate={onUpdate}
      />
    );

    fireEvent.change(screen.getByDisplayValue("00"), { target: { value: 30 } });

    fireEvent.click(screen.getByRole("button", { name: "Confirm" }));

    expect(onUpdate).toBeCalledWith({
      dayOfWeek: 2,
      endTime: "13:30:00",
      id: 0,
      startTime: "12:30:00",
    } as IntervalDto);
  });

  it("calls onClose when close button is clicked", async () => {
    render(
      <UpdateIntervalModal
        toUpdate={new Interval(0, "12:30:00", "13:00:00", 2)}
        open={true}
        onClose={onClose}
        onUpdate={onUpdate}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(onClose).toBeCalled();
  });
});
