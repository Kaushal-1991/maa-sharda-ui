import { describe, expect, it } from "vitest";
import {
  validateRegistrationForm,
  type RegistrationFormValues,
} from "./registration-form";

const validForm: RegistrationFormValues = {
  name: "Tushar Singh",
  email: "tushar@example.com",
  phone: "9876543210",
  musicOption: "CLASSICAL_MUSIC",
  mode: "ONLINE",
  address: "",
};

describe("registration form validation", () => {
  it("reports every missing required field and leaves address optional", () => {
    expect(
      validateRegistrationForm({
        name: "",
        email: "",
        phone: "",
        musicOption: "",
        mode: "",
        address: "",
      }),
    ).toEqual({
      name: "Please enter your name.",
      email: "Please enter your email address.",
      phone: "Please enter your phone number.",
      musicOption: "Please choose a music option.",
      mode: "Please choose a tuition mode.",
    });
  });

  it("accepts valid details when address is blank", () => {
    expect(validateRegistrationForm(validForm)).toEqual({});
  });

  it("reports invalid email, phone, music option, and tuition mode", () => {
    expect(
      validateRegistrationForm({
        ...validForm,
        email: "not-an-email",
        phone: "12345",
        musicOption: "UNKNOWN",
        mode: "UNKNOWN",
      }),
    ).toEqual({
      email: "Enter a valid email address.",
      phone: "Enter a valid 10-digit phone number.",
      musicOption: "Please choose a music option.",
      mode: "Please choose a tuition mode.",
    });
  });
});
