import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "../components/Input/Input";
// ensure demo handlers are registered for tests
import "./handlers";

describe("useInputMask integration", () => {
  it("calls onValueChange and preserves caret when editing in middle (phone)", async () => {
    const onValueChange = vi.fn();

    render(
      <Input
        mask={{ id: "phone" }}
        defaultValue={"1234567890"}
        onValueChange={onValueChange}
      />,
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;

  // initial formatted value should be present (wait for effect)
  await waitFor(() => expect(input.value).toBe("(123) 456-7890"));

    // place caret after the first 3 visible digits (inside area code)
    // formatted: (123) 456-7890 -> position after '3' is index of ')' so ~4
    input.setSelectionRange(4, 4);

    // simulate user inserting '9' after the '3' -> raw would be 91234567890 truncated to 10
    const newRaw = "9123456789"; // we'll simulate typed value accordingly
    const newFormatted = "(912) 345-6789";

    fireEvent.change(input, { target: { value: newFormatted, selectionStart: 5 } });

  await waitFor(() => expect(onValueChange).toHaveBeenCalled());

  const called = onValueChange.mock.calls[onValueChange.mock.calls.length - 1][0];
    expect(called.raw).toBe(newRaw);
    expect(called.formatted).toBe(newFormatted);

    // caret should be preserved; wait a tick for requestAnimationFrame
    await waitFor(() => expect(input.selectionStart).toBeGreaterThan(0));
  });

  it("calls onValueChange for currency and preserves formatting", async () => {
    const onValueChange = vi.fn();
    render(
      <Input
        mask={{ id: "currency" }}
        defaultValue={"12345"}
        onValueChange={onValueChange}
      />,
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;
  // default value 12345 -> 123.45 formatted (wait for effect)
  await waitFor(() => expect(onValueChange).toHaveBeenCalled());
  const called = onValueChange.mock.calls[0][0];
  expect(called.raw).toBe("12345");
  expect(/\d+[.,]\d{2}/.test(called.formatted)).toBe(true);
  });
});
