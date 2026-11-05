import { z } from "zod";

export const studentRegistrationSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().email().max(254),
    phone: z.string().regex(/^\d{10}$/),
    musicOption: z.enum([
      "CLASSICAL_MUSIC",
      "LIGHT_MUSIC",
      "HARMONIUM",
      "GUITAR",
    ]),
    mode: z.enum(["HOME", "ONLINE", "OFFLINE"]),
    address: z.string().trim().max(500).optional().default(""),
  })
  .strict();

export const contactMessageSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().email().max(254),
    phone: z.string().trim().max(20).optional().default(""),
    subject: z.string().trim().max(120).optional().default(""),
    message: z.string().trim().min(10).max(3000),
    website: z.string().max(0).optional(),
  })
  .strict();

export const adminLoginSchema = z
  .object({
    email: z.string().trim().email().max(254),
    password: z.string().min(1).max(256),
  })
  .strict();

export const academyClassSchema = z
  .object({
    title: z.string().trim().min(2).max(100),
    description: z.string().trim().min(10).max(1000),
    imageUrl: z.string().trim().max(500).optional().default(""),
    displayOrder: z.coerce.number().int().min(0).max(10000).default(0),
    isActive: z.boolean().default(true),
  })
  .strict();

export const registrationStatusSchema = z
  .object({
    registrationStatus: z.enum(["PENDING", "COMPLETED"]),
  })
  .strict();

export const adminStudentUpdateSchema = z
  .object({
    id: z.string().min(1),
    ...studentRegistrationSchema.shape,
  })
  .strict();

export const messageStatusSchema = z
  .object({ status: z.enum(["NEW", "READ"]) })
  .strict();

export const academyReviewSchema = z
  .object({
    name: z.string().trim().min(2).max(80),
    course: z.string().trim().min(2).max(100),
    rating: z.coerce.number().int().min(1).max(5),
    message: z.string().trim().min(10).max(1200),
  })
  .strict();

export const reviewSettingsSchema = z
  .object({ enabled: z.boolean() })
  .strict();

export const reviewModerationSchema = z
  .object({ status: z.enum(["APPROVED", "REJECTED"]) })
  .strict();

export const publicReviewQuerySchema = z.object({
  page: z.coerce.number().int().min(1).max(100000).default(1),
  limit: z.coerce.number().int().min(1).max(10).default(10),
});

export const galleryQuerySchema = z.object({
  type: z.enum(["photos", "videos"]),
  category: z.enum(["events", "classes", "album"]),
});

export type GalleryMediaType = z.infer<typeof galleryQuerySchema.shape.type>;
export type GalleryCategory = z.infer<typeof galleryQuerySchema.shape.category>;
export type StudentRegistrationInput = z.infer<
  typeof studentRegistrationSchema
>;
export type ContactMessageInput = z.infer<typeof contactMessageSchema>;
export type AcademyClassInput = z.infer<typeof academyClassSchema>;
export type AcademyReviewInput = z.infer<typeof academyReviewSchema>;
