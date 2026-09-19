import React from "react";
import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { axe, toHaveNoViolations } from "jest-axe";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "./Table";

expect.extend(toHaveNoViolations);

function Products({ striped = false }: { striped?: boolean }) {
  return (
    <Table caption="Productos" striped={striped}>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Nombre</TableHeaderCell>
          <TableHeaderCell align="end">Precio</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Widget</TableCell>
          <TableCell align="end">9.99</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Gadget</TableCell>
          <TableCell align="end">19.99</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

describe("Table", () => {
  it("names the table with its caption", () => {
    render(<Products />);
    expect(
      screen.getByRole("table", { name: "Productos" }),
    ).toBeInTheDocument();
  });

  it("header cells are column headers by default", () => {
    render(<Products />);
    const headers = screen.getAllByRole("columnheader");
    expect(headers.map((h) => h.textContent)).toEqual(["Nombre", "Precio"]);
    expect(headers[0]).toHaveAttribute("scope", "col");
  });

  it("renders the rows with their cells", () => {
    render(<Products />);
    const rows = within(screen.getByRole("table")).getAllByRole("row");
    expect(rows).toHaveLength(3);
    expect(
      within(rows[1])
        .getAllByRole("cell")
        .map((c) => c.textContent),
    ).toEqual(["Widget", "9.99"]);
  });

  it("right-aligned cells get a different class than start-aligned ones", () => {
    render(<Products />);
    const [name, price] = within(screen.getAllByRole("row")[1]).getAllByRole(
      "cell",
    );
    expect(name.className).not.toEqual(price.className);
  });

  it("striped rows get an extra class", () => {
    const { unmount } = render(<Products />);
    const plain = screen.getAllByRole("row")[1].className;
    unmount();
    render(<Products striped />);
    expect(screen.getAllByRole("row")[1].className).not.toEqual(plain);
  });

  it("wraps the table in its own scroll container", () => {
    const { container } = render(<Products />);
    expect(container.firstElementChild?.tagName).toBe("DIV");
    expect(container.firstElementChild?.firstElementChild?.tagName).toBe(
      "TABLE",
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Products striped />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
