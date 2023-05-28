import { render, screen } from "@testing-library/react";
import Loading from "src/components/UI/Loading";

describe("Loading", () => {
  it("is shown when loading", () => {
    render(<Loading isLoading={true} />);

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("is not shown when not loading", () => {
    render(<Loading isLoading={false} />);

    expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
  });
});
