import { describe, expect, it } from "vitest";
import {
  adminStudentUpdateSchema,
  contactMessageSchema,
  studentRegistrationSchema,
} from "./validation";

describe("request validation", () => {
  it("normalizes valid student registrations", () => {
    const result = studentRegistrationSchema.parse({
      name: "  Tushar Singh  ",
      email: "tushar@example.com",
      phone: "9876543210",
      musicOption: "CLASSICAL_MUSIC",
      mode: "ONLINE",
    });

    expect(result.name).toBe("Tushar Singh");
    expect(result.address).toBe("");
  });

  it("rejects registrations with an invalid phone number", () => {
    const result = studentRegistrationSchema.safeParse({
      name: "Tushar Singh",
      email: "tushar@example.com",
      phone: "12345",
      musicOption: "CLASSICAL_MUSIC",
      mode: "ONLINE",
    });

    expect(result.success).toBe(false);
  });

  it("validates admin student updates with the student id", () => {
    const result = adminStudentUpdateSchema.parse({
      id: "student-id",
      name: "Tushar Singh",
      email: "tushar@example.com",
      phone: "9876543210",
      musicOption: "CLASSICAL_MUSIC",
      mode: "ONLINE",
    });

    expect(result.id).toBe("student-id");
    expect(result.address).toBe("");
  });

  it("requires a meaningful contact message", () => {
    const result = contactMessageSchema.safeParse({
      name: "Tushar Singh",
      email: "tushar@example.com",
      message: "Short",
    });

    expect(result.success).toBe(false);
  });
});
