import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DisplayStatuses from "../../src/HealthDashboard/ItemizedStatus/DisplayStatuses";

// NOTE: These could be added to global config but it doesn't play nicely with nvim
import "@testing-library/jest-dom/vitest";
import { it, expect, describe } from "vitest";

describe("Itemized Services", () => {
  it("should be minimized by default", () => {
    render(
      <DisplayStatuses
        statuses={{
          test: { status: "healthy", message: "" },
        }}
      />,
    );

    const services = screen.queryByRole("list");

    expect(services).not.toBeInTheDocument();
  });

  it("should respect user preferences", () => {
    render(
      <DisplayStatuses
        startMaximixed="true"
        statuses={{
          test: { status: "healthy", message: "" },
        }}
      />,
    );

    const services = screen.getByText(/test/i);

    expect(services).toBeInTheDocument();
  });

  it("shows the proper status", async () => {
    render(
      <DisplayStatuses
        statuses={{
          test: { status: "healthy", message: "" },
        }}
      />,
    );

    const collapse = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(collapse);
    const service = screen.getByText(/test/i);

    expect(service).toBeInTheDocument();
  });
});
