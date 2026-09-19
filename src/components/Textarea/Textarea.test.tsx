import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { axe, toHaveNoViolations } from "jest-axe";
import { Textarea } from "./Textarea";

expect.extend(toHaveNoViolations);

describe("Textarea", () => {
  it("associates the label with the field", () => {
    render(<Textarea label="Descripción" name="description" />);
    expect(screen.getByLabelText("Descripción").tagName).toBe("TEXTAREA");
  });

  it("posts its value under its name", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <form>
        <Textarea label="Descripción" name="description" />
      </form>,
    );
    await user.type(screen.getByLabelText("Descripción"), "Azul");
    const data = new FormData(container.querySelector("form")!);
    expect(data.get("description")).toBe("Azul");
  });

  it("shows the helper text and links it to the field", () => {
    render(<Textarea label="Notas" helperText="Hasta 500 caracteres" />);
    const field = screen.getByLabelText("Notas");
    const hint = screen.getByText("Hasta 500 caracteres");
    expect(field).toHaveAttribute("aria-describedby", hint.id);
    expect(hint).not.toHaveAttribute("role");
  });

  it("in error, marks the field invalid and announces the message", () => {
    render(
      <Textarea
        label="Notas"
        state="error"
        errorMessage="Demasiado largo"
        helperText="no se muestra"
      />,
    );
    const field = screen.getByLabelText("Notas");
    const message = screen.getByRole("alert");
    expect(field).toHaveAttribute("aria-invalid", "true");
    expect(field).toHaveAttribute("aria-describedby", message.id);
    expect(message).toHaveTextContent("Demasiado largo");
    expect(screen.queryByText("no se muestra")).not.toBeInTheDocument();
  });

  it("marks required fields", () => {
    render(<Textarea label="Notas" required />);
    const field = screen.getByLabelText(/Notas/);
    expect(field).toBeRequired();
    expect(field).toHaveAttribute("aria-required", "true");
  });

  it("defaults to four rows and forwards the ref", () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<Textarea label="Notas" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
    expect(ref.current).toHaveAttribute("rows", "4");
  });

  it("uses the given id", () => {
    render(
      <Textarea label="Notas" id="notes" errorMessage="x" state="error" />,
    );
    expect(screen.getByLabelText("Notas")).toHaveAttribute("id", "notes");
    expect(screen.getByRole("alert")).toHaveAttribute("id", "notes-helper");
  });

  it("has no accessibility violations, with and without error", async () => {
    const { container } = render(
      <>
        <Textarea label="Descripción" helperText="Opcional" />
        <Textarea label="Notas" state="error" errorMessage="Requerido" />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
