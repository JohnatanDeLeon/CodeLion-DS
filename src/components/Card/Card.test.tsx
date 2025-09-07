import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
  CardSubtitle,
  CardMeta,
} from "./Card";

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
      <Card variant="elevated">
        <div>Content</div>
      </Card>,
    );
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveAttribute("data-variant", "elevated");
  });

  it("handles click events when clickable", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    
    render(
      <Card clickable onClick={handleClick}>
        <div>Clickable content</div>
      </Card>,
    );

    const card = screen.getByRole("button");
    await user.click(card);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("handles keyboard navigation when interactive", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    
    render(
      <Card variant="interactive" onClick={handleClick}>
        <div>Interactive content</div>
      </Card>,
    );

    const card = screen.getByRole("button");
    card.focus();
    await user.keyboard("{Enter}");
    expect(handleClick).toHaveBeenCalledTimes(1);

    await user.keyboard(" ");
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it("renders selected state correctly", () => {
    const { container } = render(
      <Card selected>
        <div>Selected content</div>
      </Card>,
    );
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveAttribute("aria-selected", "true");
  });

  it("renders disabled state correctly", () => {
    const { container } = render(
      <Card disabled>
        <div>Disabled content</div>
      </Card>,
    );
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveAttribute("aria-disabled", "true");
  });

  it("does not trigger click when disabled", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    
    render(
      <Card disabled onClick={handleClick}>
        <div>Disabled content</div>
      </Card>,
    );

    const card = screen.getByText("Disabled content").parentElement!;
    
    // Try to click but expect pointer-events: none to prevent interaction
    try {
      await user.click(card);
    } catch (error) {
      // This is expected behavior - the element should not be clickable
      expect((error as Error).message).toContain("pointer-events: none");
    }
    
    expect(handleClick).not.toHaveBeenCalled();
  });
});

describe("CardHeader", () => {
  it("renders with icon", () => {
    render(
      <CardHeader icon={<span data-testid="icon">Icon</span>}>
        <CardTitle>Header with icon</CardTitle>
      </CardHeader>,
    );
    
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByText("Header with icon")).toBeInTheDocument();
  });

  it("renders with image", () => {
    render(
      <CardHeader image="test.jpg" imageAlt="Test image">
        <CardTitle>Header with image</CardTitle>
      </CardHeader>,
    );
    
    expect(screen.getByAltText("Test image")).toBeInTheDocument();
    expect(screen.getByText("Header with image")).toBeInTheDocument();
  });

  it("renders with actions", () => {
    render(
      <CardHeader actions={<button>Action</button>}>
        <CardTitle>Header with actions</CardTitle>
      </CardHeader>,
    );
    
    expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
    expect(screen.getByText("Header with actions")).toBeInTheDocument();
  });
});

describe("CardContent", () => {
  it("renders content correctly", () => {
    render(
      <CardContent>
        <p>Card content text</p>
      </CardContent>,
    );
    
    expect(screen.getByText("Card content text")).toBeInTheDocument();
  });
});

describe("CardFooter", () => {
  it("renders footer correctly", () => {
    render(
      <CardFooter>
        <p>Footer content</p>
      </CardFooter>,
    );
    
    expect(screen.getByText("Footer content")).toBeInTheDocument();
  });

  it("applies divided variant correctly", () => {
    const { container } = render(
      <CardFooter divided>
        <p>Footer content</p>
      </CardFooter>,
    );
    
    expect(container.firstChild).toBeInTheDocument();
  });
});

describe("Typography Components", () => {
  it("renders CardTitle as h3", () => {
    render(<CardTitle>Test Title</CardTitle>);
    
    const title = screen.getByText("Test Title");
    expect(title.tagName).toBe("H3");
  });

  it("renders CardDescription as paragraph", () => {
    render(<CardDescription>Test Description</CardDescription>);
    
    const description = screen.getByText("Test Description");
    expect(description.tagName).toBe("P");
  });

  it("renders CardSubtitle as paragraph", () => {
    render(<CardSubtitle>Test Subtitle</CardSubtitle>);
    
    const subtitle = screen.getByText("Test Subtitle");
    expect(subtitle.tagName).toBe("P");
  });

  it("renders CardMeta as div", () => {
    render(<CardMeta>Test Meta</CardMeta>);
    
    const meta = screen.getByText("Test Meta");
    expect(meta.tagName).toBe("DIV");
  });
});

describe("Card Composition", () => {
  it("renders structured card correctly", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Structured Card</CardTitle>
          <CardDescription>This is a structured card</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Main content goes here</p>
        </CardContent>
        <CardFooter>
          <CardMeta>Meta information</CardMeta>
        </CardFooter>
      </Card>,
    );

    expect(screen.getByText("Structured Card")).toBeInTheDocument();
    expect(screen.getByText("This is a structured card")).toBeInTheDocument();
    expect(screen.getByText("Main content goes here")).toBeInTheDocument();
    expect(screen.getByText("Meta information")).toBeInTheDocument();
  });
});
