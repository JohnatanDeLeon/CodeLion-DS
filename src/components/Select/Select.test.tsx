import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Select } from "./Select";

describe("Select", () => {
  it("renders with label and options", async () => {
    render(
      <Select label="Country">
        <option value="">Select…</option>
        <option value="mx">Mexico</option>
      </Select>,
    );

    const trigger = screen.getByRole("combobox", { name: /country/i });
    expect(trigger).toBeInTheDocument();
    // Open and check options are rendered
    fireEvent.click(trigger);
    await screen.findByRole("listbox");
    expect((await screen.findAllByRole("option")).length).toBeGreaterThan(0);
  });

  it("enables scroll with custom max height when 'scroll' prop is true", async () => {
    render(
      <Select label="Fruits" scroll maxListHeight={200}>
        {Array.from({ length: 30 }).map((_, i) => (
          <option key={i} value={`v${i}`}>
            Item {i}
          </option>
        ))}
      </Select>,
    );

    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);

    const listbox = await screen.findByRole("listbox");
    expect(listbox).toHaveAttribute("data-scroll", "true");
    // Style assertion for maxHeight uses inline style set
    expect(listbox.style.maxHeight).toBe("200px");
  });
});
