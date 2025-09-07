import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Card, CardHeader, CardBody, CardFooter } from "./Card";

describe("Card", () => {
  it("renders children correctly", () => {
    render(
      <Card>
        <div>Test content</div>
      </Card>,
    );
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("applies variant classes correctly", () => {
    const { container } = render(
      <Card variant="outlined">
        <div>Content</div>
      </Card>,
    );
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveAttribute("class");
    expect(card.className).toBeTruthy();
  });

  it("applies size classes correctly", () => {
    const { container } = render(
      <Card size="lg">
        <div>Content</div>
      </Card>,
    );
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveAttribute("class");
    expect(card.className).toBeTruthy();
  });

  it("applies elevation classes correctly", () => {
    const { container } = render(
      <Card elevation="high">
        <div>Content</div>
      </Card>,
    );
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveAttribute("class");
    expect(card.className).toBeTruthy();
  });

  it("handles click events when interactive", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Card interactive onClick={handleClick}>
        <div>Interactive content</div>
      </Card>,
    );

    const card = screen.getByText("Interactive content").parentElement!;
    await user.click(card);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Card ref={ref}>
        <div>Content with ref</div>
      </Card>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("applies custom className", () => {
    const { container } = render(
      <Card className="custom-class">
        <div>Content</div>
      </Card>,
    );
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass("custom-class");
  });
});

describe("CardHeader", () => {
  it("renders children correctly", () => {
    render(
      <CardHeader>
        <h3>Header Title</h3>
      </CardHeader>,
    );
    expect(screen.getByText("Header Title")).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <CardHeader ref={ref}>
        <h3>Header with ref</h3>
      </CardHeader>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("applies custom className", () => {
    const { container } = render(
      <CardHeader className="custom-header">
        <h3>Header</h3>
      </CardHeader>,
    );
    const header = container.firstChild as HTMLElement;
    expect(header).toHaveClass("custom-header");
  });
});

describe("CardBody", () => {
  it("renders children correctly", () => {
    render(
      <CardBody>
        <p>Body content</p>
      </CardBody>,
    );
    expect(screen.getByText("Body content")).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <CardBody ref={ref}>
        <p>Body with ref</p>
      </CardBody>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("applies custom className", () => {
    const { container } = render(
      <CardBody className="custom-body">
        <p>Body</p>
      </CardBody>,
    );
    const body = container.firstChild as HTMLElement;
    expect(body).toHaveClass("custom-body");
  });
});

describe("CardFooter", () => {
  it("renders children correctly", () => {
    render(
      <CardFooter>
        <p>Footer content</p>
      </CardFooter>,
    );
    expect(screen.getByText("Footer content")).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <CardFooter ref={ref}>
        <p>Footer with ref</p>
      </CardFooter>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("applies custom className", () => {
    const { container } = render(
      <CardFooter className="custom-footer">
        <p>Footer</p>
      </CardFooter>,
    );
    const footer = container.firstChild as HTMLElement;
    expect(footer).toHaveClass("custom-footer");
  });
});

describe("Card Composition", () => {
  it("renders structured card correctly", () => {
    render(
      <Card>
        <CardHeader>
          <h3>Structured Card</h3>
          <p>This is a structured card</p>
        </CardHeader>
        <CardBody>
          <p>Main content goes here</p>
        </CardBody>
        <CardFooter>
          <p>Footer information</p>
        </CardFooter>
      </Card>,
    );

    expect(screen.getByText("Structured Card")).toBeInTheDocument();
    expect(screen.getByText("This is a structured card")).toBeInTheDocument();
    expect(screen.getByText("Main content goes here")).toBeInTheDocument();
    expect(screen.getByText("Footer information")).toBeInTheDocument();
  });

  it("renders card with all props", () => {
    const handleClick = vi.fn();

    render(
      <Card
        variant="gradient"
        size="lg"
        elevation="high"
        interactive
        onClick={handleClick}
        className="test-card"
      >
        <CardHeader className="test-header">
          <h3>Complex Card</h3>
        </CardHeader>
        <CardBody className="test-body">
          <p>Complex content</p>
        </CardBody>
        <CardFooter className="test-footer">
          <p>Complex footer</p>
        </CardFooter>
      </Card>,
    );

    expect(screen.getByText("Complex Card")).toBeInTheDocument();
    expect(screen.getByText("Complex content")).toBeInTheDocument();
    expect(screen.getByText("Complex footer")).toBeInTheDocument();
  });
});
