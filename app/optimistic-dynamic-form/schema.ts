import { z } from "zod";

const todoSchema = z.object({
  id: z.number(),
  title: z.string({ required_error: "Title is required" }),
  optimistic: z.boolean().optional(),
});

export type Todo = z.infer<typeof todoSchema>;

export const todosSchema = z.object({
  todos: z.array(todoSchema),
});
