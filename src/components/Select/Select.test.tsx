import React from "react";
import { render, screen } from "@testing-library/react";
import { Select } from "./Select";

describe("Select", () => {
  it("renders with label and options", () => {
    render(
      <Select label="Country">
        <option value="">Select…</option>
        <option value="mx">Mexico</option>
      </Select>,
    );

    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    expect(screen.getAllByRole("option").length).toBeGreaterThan(0);
  });
});
