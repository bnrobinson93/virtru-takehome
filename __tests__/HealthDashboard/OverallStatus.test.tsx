import { render, screen } from "@testing-library/react";
import OverallStatus from "../../src/HealthDashboard/OverallStatus";
import StatusContext from "../../src/contexts/Statuses";

// NOTE: These could be added to global config but it doesn't play nicely with nvim
import "@testing-library/jest-dom/vitest";
import { it, expect, describe, vi } from "vitest";

let currentStatus: ServicesHealth | null = null;
let previousStatus: PreviousStatus | null = null;
const hiddenItems: Components = {};
const timestamp = new Date().toISOString();
const paused = false;
const updateHiddenItems = vi.fn();

describe("Overall Status", () => {
  it("shows a loading state when doing initial fetch", () => {
    render(
      <StatusContext.Provider
        value={{
          error: "",
          currentStatus,
          previousStatus,
          hiddenItems,
          updateHiddenItems,
          timestamp,
          paused,
        }}
      >
        <OverallStatus />
      </StatusContext.Provider>,
    );

    const status = screen.queryByTestId("overall-status");

    expect(status).toHaveTextContent(/pending/i);
  });

  it("shows a non-loading state on the second fetch", () => {
    currentStatus = {
      status: "healthy" as Status,
      components: { service: { status: "healthy" as Status, message: "" } },
    };

    render(
      <StatusContext.Provider
        value={{
          error: "",
          currentStatus,
          previousStatus,
          hiddenItems,
          updateHiddenItems,
          timestamp,
          paused,
        }}
      >
        <OverallStatus />
      </StatusContext.Provider>,
    );

    const status = screen.queryByTestId("overall-status");

    expect(status).toHaveTextContent(/healthy/i);
  });

  it("shows a loading state if the previous state does not match the current state", () => {
    currentStatus = {
      status: "healthy" as Status,
      components: { service: { status: "healthy" as Status, message: "" } },
    };
    previousStatus = {
      data: {
        status: "unhealthy" as Status,
        components: { service: { status: "healthy" as Status, message: "" } },
      },
      timestamp: new Date().toISOString(),
    };

    render(
      <StatusContext.Provider
        value={{
          error: "",
          currentStatus,
          previousStatus,
          hiddenItems,
          updateHiddenItems,
          timestamp,
          paused,
        }}
      >
        <OverallStatus />
      </StatusContext.Provider>,
    );

    const updated = screen.queryByTestId("overall-updated");

    expect(updated).toBeInTheDocument();
  });
});
