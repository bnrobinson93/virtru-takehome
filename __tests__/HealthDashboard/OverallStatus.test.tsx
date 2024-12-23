import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// NOTE: These could be added to global config but it doesn't play nicely with nvim
import "@testing-library/jest-dom/vitest";
import { it, expect, describe } from "vitest";

describe("ExpandableText", () => {
  it("Should show the status", () => {
    render(<ExpandableText text={shortText} />);

    const article = screen.getByText(shortText);

    expect(article).toBeInTheDocument();
  });

});
