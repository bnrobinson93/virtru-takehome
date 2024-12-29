import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "../../src/HealthDashboard/Header";

// NOTE: These could be added to global config but it doesn't play nicely with nvim
import "@testing-library/jest-dom/vitest";
import { it, expect, describe } from "vitest";

let paused = false;
const pause = () => (paused = true);
const resume = () => (paused = false);

let filterBy = "";
const setFilterBy = (newVal: string) => (filterBy = newVal);

describe("Header", () => {
  it("Has a Pause button when fetching", () => {
    render(
      <Header
        pause={pause}
        resume={resume}
        paused={false}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
      />,
    );

    const pauseButton = screen.getByRole("button", { name: /Pause/i });

    expect(pauseButton).toBeInTheDocument();
  });

  it("Has a Resume button when paused", () => {
    render(
      <Header
        pause={pause}
        resume={resume}
        paused={true}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
      />,
    );

    const resumeButton = screen.getByRole("button", { name: /Resume/i });

    expect(resumeButton).toBeInTheDocument();
  });

  it("Clicking the pause/resume button should toggle it's state", async () => {
    render(
      <Header
        pause={pause}
        resume={resume}
        paused={false}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
      />,
    );

    const pauseButton = screen.getByRole("button", { name: /Pause/i });
    const user = userEvent.setup();
    await user.click(pauseButton);

    expect(paused).toBe(true);
  });

  it("should allow filtering", async () => {
    render(
      <Header
        pause={pause}
        resume={resume}
        paused={false}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
      />,
    );

    const filterButton = screen.getByRole("button", { name: /Filter/i });
    const user = userEvent.setup();
    await user.click(filterButton);
    await user.click(screen.getByRole("menuitemradio", { name: "Healthy" }));

    expect(filterBy).toBe("healthy");
  });
});
