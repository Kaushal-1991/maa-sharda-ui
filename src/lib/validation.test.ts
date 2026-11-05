import { describe, expect, it } from "vitest";
import {
  adminStudentUpdateSchema,
  academyReviewSchema,
  reviewModerationSchema,
  publicReviewQuerySchema,
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

  it("validates and normalizes academy reviews", () => {
    const result = academyReviewSchema.parse({
      name: "  Ananya Sharma ",
      course: " Guitar ",
      rating: "5",
      message: "I really enjoy learning here.",
    });

    expect(result.name).toBe("Ananya Sharma");
    expect(result.course).toBe("Guitar");
    expect(result.rating).toBe(5);
  });

  it("rejects ratings outside the five-star range", () => {
    const result = academyReviewSchema.safeParse({
      name: "Ananya Sharma",
      course: "Guitar",
      rating: 6,
      message: "I really enjoy learning here.",
    });

    expect(result.success).toBe(false);
  });

  it("only allows admin moderation to approve or reject reviews", () => {
    expect(reviewModerationSchema.parse({ status: "APPROVED" }).status).toBe("APPROVED");
    expect(reviewModerationSchema.safeParse({ status: "PENDING" }).success).toBe(false);
  });

  it("limits public review pages to ten entries", () => {
    expect(publicReviewQuerySchema.parse({ page: "2", limit: "10" })).toEqual({
      page: 2,
      limit: 10,
    });
    expect(publicReviewQuerySchema.safeParse({ page: "0", limit: "11" }).success).toBe(false);
  });
});
