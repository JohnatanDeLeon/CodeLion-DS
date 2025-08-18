import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { currencyHandler } from "./currency";

// Componente de prueba simple que usa la máscara directamente
const TestCurrencyInput: React.FC = () => {
  const [value, setValue] = React.useState("");
  const [formatted, setFormatted] = React.useState("0.00");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    // Aplicar la máscara directamente
    const result = currencyHandler.apply(newValue, null);
    setFormatted(result.formatted);
  };

  return (
    <div>
      <input
        data-testid="currency-input"
        value={formatted}
        onChange={handleChange}
        placeholder="0.00"
      />
      <div data-testid="raw-value">{value}</div>
      <div data-testid="formatted-value">{formatted}</div>
      <div data-testid="display-value">{formatted || "0.00"}</div>
    </div>
  );
};

describe("Currency Mask Integration Tests", () => {
  beforeEach(() => {
    // Limpiar el DOM antes de cada test
    document.body.innerHTML = "";
  });

  describe("User Typing Simulation", () => {
    it("simula usuario escribiendo '1' y valida que aparezca '1.00' en el DOM", async () => {
      render(<TestCurrencyInput />);

      const input = screen.getByTestId("currency-input");

      // Simular usuario escribiendo "1"
      fireEvent.change(input, { target: { value: "1" } });

      // Validar que en el DOM aparezca "1.00"
      await waitFor(() => {
        expect(input).toHaveValue("1.00");
      });

      // Validar que el valor visual sea correcto
      expect(input).toHaveValue("1.00");

      // Validar que el valor raw también se muestre correctamente
      const rawValue = screen.getByTestId("raw-value");
      expect(rawValue).toHaveTextContent("1");

      // Validar que el valor formateado existe en el DOM
      const formattedValue = screen.getByTestId("formatted-value");
      expect(formattedValue).toHaveTextContent("1.00");

      // Validar que el valor de display existe en el DOM
      const displayValue = screen.getByTestId("display-value");
      expect(displayValue).toHaveTextContent("1.00");

      // Validar que el input tiene el valor correcto en el DOM
      expect(input).toHaveValue("1.00");
    });

    it("simula usuario escribiendo '123' y valida que aparezca '123.00' en el DOM", async () => {
      render(<TestCurrencyInput />);

      const input = screen.getByTestId("currency-input");

      // Simular usuario escribiendo "123"
      fireEvent.change(input, { target: { value: "123" } });

      // Validar que en el DOM aparezca "123.00"
      await waitFor(() => {
        expect(input).toHaveValue("123.00");
      });

      expect(input).toHaveValue("123.00");

      const rawValue = screen.getByTestId("raw-value");
      expect(rawValue).toHaveTextContent("123");

      // Validar que el valor formateado existe en el DOM
      const formattedValue = screen.getByTestId("formatted-value");
      expect(formattedValue).toHaveTextContent("123.00");

      // Validar que el valor de display existe en el DOM
      const displayValue = screen.getByTestId("display-value");
      expect(displayValue).toHaveTextContent("123.00");
    });

    it("simula usuario escribiendo '123456789' y valida que aparezca '123,456,789.00' en el DOM", async () => {
      render(<TestCurrencyInput />);

      const input = screen.getByTestId("currency-input");

      // Simular usuario escribiendo "123456789"
      fireEvent.change(input, { target: { value: "123456789" } });

      // Validar que en el DOM aparezca "123,456,789.00"
      await waitFor(() => {
        expect(input).toHaveValue("123,456,789.00");
      });

      expect(input).toHaveValue("123,456,789.00");

      const rawValue = screen.getByTestId("raw-value");
      expect(rawValue).toHaveTextContent("123456789");

      // Validar que el valor formateado existe en el DOM
      const formattedValue = screen.getByTestId("formatted-value");
      expect(formattedValue).toHaveTextContent("123,456,789.00");

      // Validar que el valor de display existe en el DOM
      const displayValue = screen.getByTestId("display-value");
      expect(displayValue).toHaveTextContent("123,456,789.00");
    });

    it("simula usuario escribiendo '123456.50' y valida que aparezca '123,456.50' en el DOM", async () => {
      render(<TestCurrencyInput />);

      const input = screen.getByTestId("currency-input");

      // Simular usuario escribiendo "123456.50"
      fireEvent.change(input, { target: { value: "123456.50" } });

      // Validar que en el DOM aparezca "123,456.50"
      await waitFor(() => {
        expect(input).toHaveValue("123,456.50");
      });

      expect(input).toHaveValue("123,456.50");

      const rawValue = screen.getByTestId("raw-value");
      expect(rawValue).toHaveTextContent("123456.50");

      // Validar que el valor formateado existe en el DOM
      const formattedValue = screen.getByTestId("formatted-value");
      expect(formattedValue).toHaveTextContent("123,456.50");

      // Validar que el valor de display existe en el DOM
      const displayValue = screen.getByTestId("display-value");
      expect(displayValue).toHaveTextContent("123,456.50");
    });
  });

  describe("Step-by-Step User Interaction", () => {
    it("simula usuario escribiendo paso a paso '123' y valida cada estado en el DOM", async () => {
      render(<TestCurrencyInput />);

      const input = screen.getByTestId("currency-input");

      // Paso 1: Usuario escribe "1"
      fireEvent.change(input, { target: { value: "1" } });
      await waitFor(() => {
        expect(input).toHaveValue("1.00");
      });

      // Validar que existe en el DOM
      const displayValue1 = screen.getByTestId("display-value");
      expect(displayValue1).toHaveTextContent("1.00");

      // Paso 2: Usuario escribe "12"
      fireEvent.change(input, { target: { value: "12" } });
      await waitFor(() => {
        expect(input).toHaveValue("12.00");
      });

      // Validar que existe en el DOM
      const displayValue2 = screen.getByTestId("display-value");
      expect(displayValue2).toHaveTextContent("12.00");

      // Paso 3: Usuario escribe "123"
      fireEvent.change(input, { target: { value: "123" } });
      await waitFor(() => {
        expect(input).toHaveValue("123.00");
      });

      // Validar estado final
      expect(input).toHaveValue("123.00");

      // Validar que existe en el DOM
      const displayValue3 = screen.getByTestId("display-value");
      expect(displayValue3).toHaveTextContent("123.00");
    });

    it("simula usuario editando valor existente y valida cambios en el DOM", async () => {
      render(<TestCurrencyInput />);

      const input = screen.getByTestId("currency-input");

      // Usuario escribe "123"
      fireEvent.change(input, { target: { value: "123" } });
      await waitFor(() => {
        expect(input).toHaveValue("123.00");
      });

      // Validar que existe en el DOM
      const displayValue1 = screen.getByTestId("display-value");
      expect(displayValue1).toHaveTextContent("123.00");

      // Usuario cambia a "523"
      fireEvent.change(input, { target: { value: "523" } });
      await waitFor(() => {
        expect(input).toHaveValue("523.00");
      });

      expect(input).toHaveValue("523.00");

      // Validar que existe en el DOM
      const displayValue2 = screen.getByTestId("display-value");
      expect(displayValue2).toHaveTextContent("523.00");
    });

    it("simula usuario limpiando el campo y empezando de nuevo", async () => {
      render(<TestCurrencyInput />);

      const input = screen.getByTestId("currency-input");

      // Usuario escribe "123"
      fireEvent.change(input, { target: { value: "123" } });
      await waitFor(() => {
        expect(input).toHaveValue("123.00");
      });

      // Validar que existe en el DOM
      const displayValue1 = screen.getByTestId("display-value");
      expect(displayValue1).toHaveTextContent("123.00");

      // Usuario limpia el campo
      fireEvent.change(input, { target: { value: "" } });
      await waitFor(() => {
        expect(input).toHaveValue("0.00");
      });

      // Validar que existe en el DOM
      const displayValue2 = screen.getByTestId("display-value");
      expect(displayValue2).toHaveTextContent("0.00");

      // Usuario escribe "7"
      fireEvent.change(input, { target: { value: "7" } });
      await waitFor(() => {
        expect(input).toHaveValue("7.00");
      });

      expect(input).toHaveValue("7.00");

      // Validar que existe en el DOM
      const displayValue3 = screen.getByTestId("display-value");
      expect(displayValue3).toHaveTextContent("7.00");
    });
  });

  describe("Real-world Scenarios in DOM", () => {
    it("valida precios de e-commerce en el DOM", async () => {
      render(<TestCurrencyInput />);

      const input = screen.getByTestId("currency-input");

      const testCases = [
        { input: "999", expected: "999.00" },
        { input: "1999", expected: "1,999.00" },
        { input: "9999", expected: "9,999.00" },
        { input: "99999", expected: "99,999.00" },
      ];

      for (const { input: testInput, expected } of testCases) {
        fireEvent.change(input, { target: { value: testInput } });

        await waitFor(() => {
          expect(input).toHaveValue(expected);
        });

        expect(input).toHaveValue(expected);

        // Validar que existe en el DOM
        const displayValue = screen.getByTestId("display-value");
        expect(displayValue).toHaveTextContent(expected);
      }
    });

    it("valida precios decimales en el DOM", async () => {
      render(<TestCurrencyInput />);

      const input = screen.getByTestId("currency-input");

      const testCases = [
        { input: "9.99", expected: "9.99" },
        { input: "19.99", expected: "19.99" },
        { input: "99.99", expected: "99.99" },
        { input: "999.99", expected: "999.99" },
      ];

      for (const { input: testInput, expected } of testCases) {
        fireEvent.change(input, { target: { value: testInput } });

        await waitFor(() => {
          expect(input).toHaveValue(expected);
        });

        expect(input).toHaveValue(expected);

        // Validar que existe en el DOM
        const displayValue = screen.getByTestId("display-value");
        expect(displayValue).toHaveTextContent(expected);
      }
    });
  });

  describe("DOM Element Properties", () => {
    it("valida que el input tenga las propiedades correctas en el DOM", () => {
      render(<TestCurrencyInput />);

      const input = screen.getByTestId("currency-input");

      // Validar que el elemento existe en el DOM
      expect(input).toBeInTheDocument();

      // Validar que es un input
      expect(input.tagName).toBe("INPUT");

      // Validar que tiene el tipo correcto
      expect((input as HTMLInputElement).type).toBe("text");

      // Validar que tiene el testid correcto
      expect(input).toHaveAttribute("data-testid", "currency-input");
    });

    it("valida que el input tenga el valor inicial correcto en el DOM", () => {
      render(<TestCurrencyInput />);

      const input = screen.getByTestId("currency-input");

      // Validar valor inicial
      expect(input).toHaveValue("0.00");

      // Validar que existe en el DOM
      const displayValue = screen.getByTestId("display-value");
      expect(displayValue).toHaveTextContent("0.00");
    });
  });

  describe("DOM Content Validation", () => {
    it("valida que todos los elementos de display muestren el mismo valor", async () => {
      render(<TestCurrencyInput />);

      const input = screen.getByTestId("currency-input");
      const rawValue = screen.getByTestId("raw-value");
      const formattedValue = screen.getByTestId("formatted-value");
      const displayValue = screen.getByTestId("display-value");

      // Escribir "123"
      fireEvent.change(input, { target: { value: "123" } });

      await waitFor(() => {
        expect(input).toHaveValue("123.00");
      });

      // Validar que todos los elementos muestren valores consistentes
      expect(rawValue).toHaveTextContent("123");
      expect(formattedValue).toHaveTextContent("123.00");
      expect(displayValue).toHaveTextContent("123.00");
      expect(input).toHaveValue("123.00");
    });

    it("valida que el DOM se actualice correctamente después de cambios", async () => {
      render(<TestCurrencyInput />);

      const input = screen.getByTestId("currency-input");
      const displayValue = screen.getByTestId("display-value");

      // Cambio 1: "1" → "1.00"
      fireEvent.change(input, { target: { value: "1" } });
      await waitFor(() => {
        expect(displayValue).toHaveTextContent("1.00");
      });

      // Cambio 2: "12" → "12.00"
      fireEvent.change(input, { target: { value: "12" } });
      await waitFor(() => {
        expect(displayValue).toHaveTextContent("12.00");
      });

      // Cambio 3: "123" → "123.00"
      fireEvent.change(input, { target: { value: "123" } });
      await waitFor(() => {
        expect(displayValue).toHaveTextContent("123.00");
      });

      // Validar estado final
      expect(input).toHaveValue("123.00");
      expect(displayValue).toHaveTextContent("123.00");
    });
  });
});
