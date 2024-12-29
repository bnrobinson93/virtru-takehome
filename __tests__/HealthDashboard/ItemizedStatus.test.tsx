import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DisplayStatuses from "../../src/HealthDashboard/ItemizedStatus/DisplayStatuses";
import StatusContext from "@/contexts/Statuses";
import ListItem from "@/HealthDashboard/ItemizedStatus/ListItem";
import { Accordion } from "@/components/ui/accordion";

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
    const service = screen.getByText(/Test/i);
    expect(service).toBeInTheDocument();
  });

  // TODO: This should probably be an integration test, since it requires context.
  // However, I wanted something to at least mock it out
  it("should allow the hiding of items", async () => {
    const updateHiddenItems = vi.fn();
    const contextValue = { updateHiddenItems };

    render(
      <StatusContext.Provider value={contextValue}>
        <DisplayStatuses
          startMaximixed="true"
          statuses={{
            test: { status: "healthy", message: "message" },
          }}
        />
      </StatusContext.Provider>,
    );

    const hideButton = screen.getByRole("button", { name: "Hide" });
    await user.click(hideButton);

    expect(updateHiddenItems).toHaveBeenCalledWith(["test"], "add");
  });

  it("should not show a change in status if the status did not change", () => {
    render(
      <Accordion type="single" collapsible>
        <ListItem
          serviceName="test"
          checked={{}}
          status={{ status: "healthy", message: "" }}
          lastStatus={{ status: "healthy", message: "" }}
          lastStatusTimestamp={new Date().toISOString()}
        />
      </Accordion>,
    );

    const row = screen.queryByTestId("update-badge");

    expect(row).not.toBeInTheDocument();
  });

  it("should show a change in status", () => {
    render(
      <Accordion type="single" collapsible>
        <ListItem
          serviceName="test"
          checked={{}}
          status={{ status: "healthy", message: "" }}
          lastStatus={{ status: "unhealthy", message: "" }}
          lastStatusTimestamp={new Date().toISOString()}
        />
      </Accordion>,
    );

    const row = screen.getByTestId("update-badge");

    expect(row).toBeInTheDocument();
  });
});
