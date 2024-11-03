import { z } from 'zod'

export const formSchema = z.object({
  count: z.number().min(-5).max(5),
})
