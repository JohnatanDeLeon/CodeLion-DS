// Small re-export module to centralize testing-library usage for stories
// Keeps stories importing from a local path to satisfy repo lint rules
export { within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
export { userEvent };
