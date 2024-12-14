import { z } from "zod";

export const schema = z.object({
  message: z
    .string({ required_error: "Message is required" })
    .min(10, "Message is too short")
    .max(100, "Message is too long"),
});
