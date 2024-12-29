import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListItem from "../../src/HealthDashboard/HiddenItems/ListItem";
import StatusContext from "@/contexts/Statuses";

// NOTE: These could be added to global config but it doesn't play nicely with nvim
import "@testing-library/jest-dom/vitest";
import { it, expect, describe, vi } from "vitest";

const user = userEvent.setup();

describe("Hidden Items", () => {
  it("should display hidden items", () => {
    render(
      <ListItem
        serviceName="test"
        status="healthy"
        checked={{}}
        setChecked={vi.fn()}
      />,
    );

    const hiddenItem = screen.getByRole("checkbox", { name: "test" });

    expect(hiddenItem).toBeInTheDocument();
  });

  // TODO: This should probably be an integration test, since it requires context.
  // However, I wanted something to at least mock it out
  it("should allow hidden items to be restored", async () => {
    const updateHiddenItems = vi.fn();
    const contextValue = {
      currentStatus: null,
      previousStatus: null,
      hiddenItems: {},
      updateHiddenItems,
      timestamp: "",
      paused: false,
      error: null,
    };

    render(
      <StatusContext.Provider value={contextValue}>
        <ListItem
          serviceName="test"
          status="healthy"
          checked={{}}
          setChecked={vi.fn()}
        />
      </StatusContext.Provider>,
    );

    const restoreButton = screen.getByRole("button", { name: "Restore" });
    await user.click(restoreButton);

    expect(updateHiddenItems).toHaveBeenCalledWith(["test"], "remove");
  });
});
