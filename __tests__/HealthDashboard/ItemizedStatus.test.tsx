import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DisplayStatuses from "../../src/HealthDashboard/ItemizedStatus/DisplayStatuses";
import StatusContext from "@/contexts/Statuses";

// NOTE: These could be added to global config but it doesn't play nicely with nvim
import "@testing-library/jest-dom/vitest";
import { it, expect, describe, vi } from "vitest";

const user = userEvent.setup();

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
        startMaximixed="true"
        statuses={{
          test: { status: "healthy", message: "message" },
        }}
      />,
    );
    const service = screen.getByRole("checkbox", { name: /Test/i });
    expect(service).toBeInTheDocument();
  });

  // TODO: This should probably be an integration test, since it requires context.
  // However, I wanted something to at least mock it out
  it("should allow the hiding of items", async () => {
    const updateHiddenItems = vi.fn();
    const contextValue = { updateHiddenItems };

    render(
      <StatusContext.Provider value={contextValue}>
        <StatusContext.Provider value={{ updateHiddenItems }}>
          <DisplayStatuses
            startMaximixed="true"
            statuses={{
              test: { status: "healthy", message: "message" },
            }}
          />
        </StatusContext.Provider>
      </StatusContext.Provider>,
    );

    const hideButton = screen.getByRole("button", { name: "Hide" });
    await user.click(hideButton);

    expect(updateHiddenItems).toHaveBeenCalledWith(["test"], "add");
  });
});
