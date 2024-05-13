import { z } from 'zod'

export const createTaskSchema = z.object({
  taskTitle: z.string({
    required_error: "Title is required",
  }),
  taskDescription: z.string({
    required_error: "Description is required",
  }),
  taskDate: z
    .string({
      required_error: "DateTime is wrong",
    })
    .datetime()
    .nullish()
    .optional(),
  deleted: z.boolean().default(false)
});
