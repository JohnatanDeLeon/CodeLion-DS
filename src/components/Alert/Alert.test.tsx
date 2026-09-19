import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { axe, toHaveNoViolations } from "jest-axe";
import { Alert } from "./Alert";

expect.extend(toHaveNoViolations);

describe("Alert", () => {
  it("renders the title and the message", () => {
    render(<Alert title="No se pudo guardar">El backend no respondió</Alert>);
    expect(screen.getByText("No se pudo guardar")).toBeInTheDocument();
    expect(screen.getByText("El backend no respondió")).toBeInTheDocument();
  });

  it.each([
    ["error", "alert"],
    ["warning", "alert"],
    ["info", "status"],
    ["success", "status"],
  ] as const)("a %s alert uses role=%s", (variant, role) => {
    render(<Alert variant={variant}>Mensaje</Alert>);
    expect(screen.getByRole(role)).toHaveTextContent("Mensaje");
  });

  it("an explicit role wins", () => {
    render(
      <Alert variant="error" role="note">
        Mensaje
      </Alert>,
    );
    expect(screen.getByRole("note")).toBeInTheDocument();
  });

  it("defaults to info and forwards the ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Alert ref={ref}>Hola</Alert>);
    expect(ref.current).toHaveAttribute("role", "status");
  });

  it("has no accessibility violations in any tone", async () => {
    const { container } = render(
      <>
        <Alert variant="info">Info</Alert>
        <Alert variant="success">Listo</Alert>
        <Alert variant="warning" title="Cuidado">
          Advertencia
        </Alert>
        <Alert variant="error" title="Error">
          Falló
        </Alert>
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
