import { z } from 'zod';

const identifierSchema = z
  .string()
  .trim()
  .min(1)
  .max(120)
  .regex(/^[A-Za-z0-9._:-]+$/, 'Only letters, numbers, dot, underscore, colon and dash are allowed.');

export const leaderboardEntrySchema = z.object({
  rank: z.number().int().positive(),
  itemId: z.string().min(1).max(120),
  displayName: z.string().max(240).nullable().optional(),
  score: z.number().finite()
});

export const leaderboardResponseSchema = z.object({
  leaderboardId: z.string().min(1).max(80),
  limit: z.number().int().positive(),
  generatedAt: z.string().datetime({ offset: true }),
  items: z.array(leaderboardEntrySchema)
});

export const publishScoreEventRequestSchema = z
  .object({
    eventId: z.string().trim().min(1).max(120).optional(),
    leaderboardId: identifierSchema.max(80).optional(),
    itemId: identifierSchema,
    displayName: z.string().trim().max(240).optional(),
    delta: z.number().finite().optional(),
    absoluteScore: z.number().finite().optional()
  })
  .refine((value) => (value.delta === undefined) !== (value.absoluteScore === undefined), {
    message: 'Provide exactly one score mode: delta or absolute score.',
    path: ['delta']
  });

export const publishScoreEventResponseSchema = z.object({
  eventId: z.string(),
  topic: z.string(),
  partition: z.number().int(),
  offset: z.number().int()
});

export const actuatorHealthSchema = z.object({
  status: z.string(),
  components: z.record(z.string(), z.unknown()).optional()
});

export type LeaderboardEntry = z.infer<typeof leaderboardEntrySchema>;
export type LeaderboardResponse = z.infer<typeof leaderboardResponseSchema>;
export type PublishScoreEventRequest = z.infer<typeof publishScoreEventRequestSchema>;
export type PublishScoreEventResponse = z.infer<typeof publishScoreEventResponseSchema>;
export type ActuatorHealth = z.infer<typeof actuatorHealthSchema>;
