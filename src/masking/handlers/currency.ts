import type { MaskHandler, CaretPosition } from "../types";

export const currencyHandler: MaskHandler = {
  id: "currency",
  apply(
    input: string,
    caret?: CaretPosition,
    _options?: Record<string, unknown>,
  ) {
    // Si el input está vacío, mostrar placeholder
    if (!input || input === "") {
      return {
        raw: "",
        formatted: "0.00",
        caret: 0,
        meta: {
          valueInCents: 0,
          valueInDollars: 0,
          isEmpty: true,
        },
      };
    }

    // Extraer solo los dígitos del input (ignorar puntos, comas y otros caracteres)
    const digits = input.replace(/[^0-9]/g, "");

    // Si no hay dígitos, mostrar placeholder
    if (digits === "") {
      return {
        raw: "",
        formatted: "0.00",
        caret: 0,
        meta: {
          valueInCents: 0,
          valueInDollars: 0,
          isEmpty: true,
        },
      };
    }

    // Verificar si el input original tenía punto decimal
    const hasDecimal = input.includes(".");

    if (hasDecimal) {
      // Si el input tiene punto decimal, preservar el formato
      // Extraer la parte entera y decimal
      const parts = input.split(".");
      const wholePart = parts[0].replace(/[^0-9]/g, "") || "0";
      const decimalPart = parts[1]?.replace(/[^0-9]/g, "") || "00";

      // Limitar la parte decimal a 2 dígitos
      const limitedDecimal = decimalPart.slice(0, 2).padEnd(2, "0");

      const wholeNum = parseInt(wholePart, 10) || 0;
      const decimalNum = parseInt(limitedDecimal, 10) || 0;

      // Formatear con comas para miles y preservar decimales
      const formatted =
        wholeNum.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
          style: "decimal",
        }) +
        "." +
        limitedDecimal;

      // Calcular valor total en centavos
      const totalCents = wholeNum * 100 + decimalNum;

      // Calcular nueva posición del cursor
      let newCaret: CaretPosition = null;
      if (typeof caret === "number") {
        // Lógica simplificada para inputs con decimales
        newCaret = Math.min(caret, formatted.length);
      }

      return {
        raw: wholePart + limitedDecimal,
        formatted,
        caret: newCaret,
        meta: {
          valueInCents: totalCents,
          valueInDollars: totalCents / 100,
          isEmpty: false,
        },
      };
    } else {
      // Input sin punto decimal - tratar como número entero
      const num = parseInt(digits, 10);

      // Formatear como moneda con 2 decimales
      const formatted = num.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        style: "decimal",
      });

      // Calcular nueva posición del cursor de manera inteligente
      let newCaret: CaretPosition = null;

      if (typeof caret === "number") {
        // Si el usuario está escribiendo al inicio, colocar el cursor después del primer dígito
        if (caret === 0 && digits.length === 1) {
          newCaret = 1;
        }
        // Si el usuario está escribiendo al final, colocar el cursor antes de los decimales
        else if (caret >= input.length - 3) {
          // Encontrar la posición antes de los decimales
          const decimalIndex = formatted.lastIndexOf(".");
          if (decimalIndex !== -1) {
            newCaret = decimalIndex;
          } else {
            newCaret = formatted.length;
          }
        }
        // En otros casos, intentar mantener una posición lógica
        else {
          // Contar dígitos antes de la posición del cursor
          const digitsBefore = input
            .slice(0, caret)
            .replace(/[^0-9]/g, "").length;

          if (digitsBefore === 0) {
            newCaret = 0;
          } else {
            // Encontrar la posición después del dígito correspondiente en el formato
            let seen = 0;
            for (let i = 0; i < formatted.length; i++) {
              if (/\d/.test(formatted[i])) {
                seen++;
                if (seen === digitsBefore) {
                  newCaret = i + 1;
                  break;
                }
              }
            }
            if (newCaret === null) {
              newCaret = formatted.length;
            }
          }
        }
      }

      return {
        raw: digits,
        formatted,
        caret: newCaret,
        meta: {
          valueInCents: num * 100, // Convertir dólares a centavos para metadata
          valueInDollars: num,
          isEmpty: false,
        },
      };
    }
  },

  parse(formatted: string) {
    // Remover todos los caracteres no numéricos y retornar como string
    return formatted.replace(/[^0-9]/g, "");
  },

  validate(raw: string) {
    // Aceptar cualquier string que contenga solo dígitos
    // Rechazar strings vacíos
    if (raw === "") return false;
    return /^[0-9]*$/.test(raw);
  },
};
